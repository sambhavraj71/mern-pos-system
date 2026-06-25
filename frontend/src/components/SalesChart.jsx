import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({
  orders,
}) {
  const salesMap = {};

  orders.forEach((order) => {
    const date = new Date(
      order.createdAt
    ).toLocaleDateString();

    salesMap[date] =
      (salesMap[date] || 0) +
      order.totalAmount;
  });

  const data = {
    labels: Object.keys(
      salesMap
    ),

    datasets: [
      {
        label:
          "Sales Revenue",
        data: Object.values(
          salesMap
        ),
      },
    ],
  };

  return (
    <Bar data={data} />
  );
}