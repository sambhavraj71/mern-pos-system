import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { exportOrdersCSV } from "../utils/exportCSV";
import { exportOrdersPDF } from "../utils/exportPDF";
export default function Reports() {
  const [orders, setOrders] =
    useState([]);

  const [inventory,
    setInventory] =
    useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports =
    async () => {
      try {
        const ordersRes =
          await API.get(
            "/orders"
          );

        const inventoryRes =
          await API.get(
            "/inventory"
          );

        setOrders(
          ordersRes.data
        );

        setInventory(
          inventoryRes.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum +
        order.totalAmount,
      0
    );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Reports
      </h1>
      <div className="flex gap-3 mb-5">

  <button
    onClick={() =>
      exportOrdersCSV(
        orders
      )
    }
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Export CSV
  </button>

  <button
    onClick={() =>
      exportOrdersPDF(
        orders
      )
    }
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Export PDF
  </button>

</div>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="border p-4 rounded">
          <h3>
            Total Orders
          </h3>

          <p className="text-3xl font-bold">
            {orders.length}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>
            Revenue
          </h3>

          <p className="text-3xl font-bold">
            ₹{totalRevenue}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>
            Inventory Items
          </h3>

          <p className="text-3xl font-bold">
            {
              inventory.length
            }
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-3">
            Recent Sales
          </h2>

          {orders
            .slice(0, 10)
            .map(
              (order) => (
                <div
                  key={
                    order._id
                  }
                  className="border-b py-2"
                >
                  <p>
                    {
                      order.customerName
                    }
                  </p>

                  <p>
                    ₹
                    {
                      order.totalAmount
                    }
                  </p>
                </div>
              )
            )}
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-3">
            Inventory Status
          </h2>

          {inventory.map(
            (item) => (
              <div
                key={
                  item._id
                }
                className="border-b py-2"
              >
                <p>
                  {
                    item.product
                      ?.name
                  }
                </p>

                <p>
                  Stock:
                  {
                    item.currentStock
                  }
                </p>
              </div>
            )
          )}
        </div>

      </div>
    </Layout>
  );
}