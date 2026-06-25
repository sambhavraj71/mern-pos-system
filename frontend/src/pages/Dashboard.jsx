import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  const [stats, setStats] =
    useState(null);

  const [recentOrders,
    setRecentOrders] =
    useState([]);

  const [topProducts,
    setTopProducts] =
    useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const statsRes =
          await API.get(
            "/dashboard/stats"
          );

        const recentRes =
          await API.get(
            "/dashboard/recent-orders"
          );

        const topRes =
          await API.get(
            "/dashboard/top-products"
          );

        setStats(
          statsRes.data
        );

        setRecentOrders(
          recentRes.data
        );

        setTopProducts(
          topRes.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!stats)
    return (
      <Layout>
        Loading...
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="border p-4 rounded">
          <h3>Products</h3>

          <p className="text-3xl font-bold">
            {stats.totalProducts}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>Orders</h3>

          <p className="text-3xl font-bold">
            {stats.totalOrders}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>Revenue</h3>

          <p className="text-3xl font-bold">
            ₹{stats.totalRevenue}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>Low Stock</h3>

          <p className="text-3xl font-bold text-red-500">
            {stats.lowStockProducts}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">
            Recent Orders
          </h2>

          {recentOrders.map(
            (order) => (
              <div
                key={order._id}
                className="border-b py-2"
              >
                <p>
                  {order.customerName}
                </p>

                <p>
                  ₹{order.totalAmount}
                </p>
              </div>
            )
          )}
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">
            Top Products
          </h2>

          {topProducts.map(
            (item) => (
              <div
                key={item._id}
                className="border-b py-2"
              >
                <p>
                  {
                    item.product
                      ?.name
                  }
                </p>

                <p>
                  Sold:{" "}
                  {
                    item.totalSold
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-8 border p-5 rounded">
        <h2 className="text-2xl font-bold mb-4">
          Sales Analytics
        </h2>

        <SalesChart
          orders={recentOrders}
        />
      </div>
    </Layout>
  );
}