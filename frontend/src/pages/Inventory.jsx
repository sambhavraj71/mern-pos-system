import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import StockModal from "../components/StockModal";

export default function Inventory() {
  const [inventories,
    setInventories] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [action, setAction] =
    useState("IN");

  const [selectedInventory,
    setSelectedInventory] =
    useState(null);

  useEffect(() => {
    fetchInventories();
  }, []);


  
  const fetchInventories =
    async () => {
      try {
        const { data } =
          await API.get(
            "/inventory"
          );

        setInventories(data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-5">
        Inventory
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventories.map(
            (item) => (
              <tr
                key={item._id}
                className="border-t text-center"
              >
                <td>
                  {
                    item.product
                      ?.name
                  }
                </td>

                <td>
                  {
                    item.product
                      ?.sku
                  }
                </td>

                <td>
                  {
                    item.currentStock
                  }
                </td>

                <td>
                  {
                    item.reorderLevel
                  }
                </td>

                <td>
                  {item.currentStock <=
                  item.reorderLevel ? (
                    <span className="bg-red-500 text-white px-2 py-1 rounded">
                      Low Stock
                    </span>
                  ) : (
                    <span className="bg-green-500 text-white px-2 py-1 rounded">
                      Good
                    </span>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => {
                      setSelectedInventory(
                        item
                      );
                      setAction(
                        "IN"
                      );
                      setOpen(
                        true
                      );
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    IN
                  </button>

                  <button
                    onClick={() => {
                      setSelectedInventory(
                        item
                      );
                      setAction(
                        "OUT"
                      );
                      setOpen(
                        true
                      );
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    OUT
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <StockModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        inventory={
          selectedInventory
        }
        action={action}
        refresh={
          fetchInventories
        }
      />
    </Layout>
  );
}