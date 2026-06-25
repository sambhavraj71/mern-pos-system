const PDFDocument = require("pdfkit");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

exports.downloadInvoice =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res
          .status(404)
          .json({
            message:
              "Order not found",
          });
      }

      const items =
        await OrderItem.find({
          order: order._id,
        }).populate(
          "product",
          "name sku"
        );

      const doc =
        new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=invoice-${order._id}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(22)
        .text(
          "INVOICE",
          {
            align:
              "center",
          }
        );

      doc.moveDown();

      doc.text(
        `Customer: ${order.customerName}`
      );

      doc.text(
        `Payment: ${order.paymentMethod}`
      );

      doc.text(
        `Date: ${new Date(
          order.createdAt
        ).toLocaleString()}`
      );

      doc.moveDown();

      items.forEach(
        (item) => {
          doc.text(
            `${item.product?.name}
Qty: ${item.quantity}
Price: ₹${item.price}
Subtotal: ₹${item.subtotal}`
          );

          doc.moveDown();
        }
      );

      doc.fontSize(18);

      doc.text(
        `Total: ₹${order.totalAmount}`
      );

      doc.end();
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };