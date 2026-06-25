import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      try {
        const { data } =
          await API.get(
            "/orders"
          );

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-5">
        Orders History
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Customer</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(
            (order) => (
              <tr
                key={
                  order._id
                }
                className="border-t text-center"
              >
                <td>
                  {order._id.slice(
                    -6
                  )}
                </td>

                <td>
                  {
                    order.customerName
                  }
                </td>

                <td>
                  {
                    order.paymentMethod
                  }
                </td>

                <td>
                  ₹
                  {
                    order.totalAmount
                  }
                </td>

                <td>
                  {
                    order.status
                  }
                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/orders/${order._id}`
                      )
                    }
                    className="bg-black text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                  
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Layout>
  );
}