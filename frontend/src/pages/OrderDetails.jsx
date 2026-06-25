import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Layout from "../components/Layout";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [items, setItems] =
    useState([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder =
    async () => {
      try {
        const { data } =
          await API.get(
            `/orders/${id}`
          );

        setOrder(data.order);
        setItems(data.items);
      } catch (error) {
        console.log(error);
      }
    };

  if (!order)
    return (
      <Layout>
        Loading...
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-5">
        Order Details
      </h1>

      <div className="border p-4 rounded mb-5">
        <p>
          <strong>
            Customer:
          </strong>{" "}
          {order.customerName}
        </p>

        <p>
          <strong>
            Payment:
          </strong>{" "}
          {order.paymentMethod}
        </p>

        <p>
          <strong>
            Status:
          </strong>{" "}
          {order.status}
        </p>

        <p>
          <strong>
            Total:
          </strong>{" "}
          ₹
          {
            order.totalAmount
          }
        </p>

        <p>
          <strong>
            Date:
          </strong>{" "}
          {new Date(
            order.createdAt
          ).toLocaleString()}
        </p>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>
              Product
            </th>
            <th>SKU</th>
            <th>
              Quantity
            </th>
            <th>
              Price
            </th>
            <th>
              Subtotal
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map(
            (item) => (
              <tr
                key={
                  item._id
                }
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
                    item.quantity
                  }
                </td>

                <td>
                  ₹
                  {
                    item.price
                  }
                </td>

                <td>
                  ₹
                  {
                    item.subtotal
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Layout>
  );
}