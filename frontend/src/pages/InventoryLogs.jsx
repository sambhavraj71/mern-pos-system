import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

export default function InventoryLogs() {
  const [logs, setLogs] =
    useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data } =
        await API.get(
          "/inventory/logs/all"
        );

      setLogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-5">
        Inventory Logs
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">
                Product
              </th>

              <th className="p-2">
                SKU
              </th>

              <th className="p-2">
                Action
              </th>

              <th className="p-2">
                Qty
              </th>

              <th className="p-2">
                Previous
              </th>

              <th className="p-2">
                New
              </th>

              <th className="p-2">
                Note
              </th>

              <th className="p-2">
                User
              </th>

              <th className="p-2">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id}
                className="border-t text-center"
              >
                <td className="p-2">
                  {log.product?.name ||
                    "-"}
                </td>

                <td className="p-2">
                  {log.product?.sku ||
                    "-"}
                </td>

                <td className="p-2">
                  {log.action ===
                  "IN" ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded">
                      IN
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded">
                      OUT
                    </span>
                  )}
                </td>

                <td className="p-2">
                  {log.quantity}
                </td>

                <td className="p-2">
                  {
                    log.previousStock
                  }
                </td>

                <td className="p-2">
                  {log.newStock}
                </td>

                <td className="p-2">
                  {log.note ||
                    "-"}
                </td>

                <td className="p-2">
                  {log
                    .performedBy
                    ?.name || "-"}
                </td>

                <td className="p-2">
                  {new Date(
                    log.createdAt
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}