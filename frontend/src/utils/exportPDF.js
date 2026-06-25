import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportOrdersPDF = (
  orders
) => {
  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Sales Report",
    14,
    20
  );

  autoTable(doc, {
    startY: 30,

    head: [[
      "Customer",
      "Payment",
      "Amount",
      "Status",
      "Date",
    ]],

    body: orders.map(
      (order) => [
        order.customerName,
        order.paymentMethod,
        `₹${order.totalAmount}`,
        order.status,
        new Date(
          order.createdAt
        ).toLocaleString(),
      ]
    ),
  });

  doc.save(
    "sales-report.pdf"
  );
};