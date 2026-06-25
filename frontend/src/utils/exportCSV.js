import { saveAs } from "file-saver";

export const exportOrdersCSV = (
  orders
) => {
  const headers = [
    "Customer",
    "Payment Method",
    "Amount",
    "Status",
    "Date",
  ];

  const rows = orders.map(
    (order) => [
      order.customerName,
      order.paymentMethod,
      order.totalAmount,
      order.status,
      new Date(
        order.createdAt
      ).toLocaleString(),
    ]
  );

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.join(",")
    )
    .join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  saveAs(
    blob,
    "sales-report.csv"
  );
};