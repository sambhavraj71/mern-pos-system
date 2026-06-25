require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require(
  "./src/config/db"
);

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./src/routes/authRoutes")
);
app.use(
  "/api/users",
  require("./src/routes/userRoutes")
);

app.get("/", (req, res) => {
  res.send("POS API Running");
});
app.use(
  "/api/stores",
  require("./src/routes/storeRoutes")
);
app.use(
  "/api/inventory",
  require(
    "./src/routes/inventoryRoutes"
  )
);
app.use(
  "/api/products",
  require("./src/routes/productRoutes")
);
app.use(
  "/api/dashboard",
  require(
    "./src/routes/dashboardRoutes"
  )
);
app.use(
  "/api/orders",
  require("./src/routes/orderRoutes")
);

app.use(
  "/api/invoice",
  require(
    "./src/routes/invoiceRoutes"
  )
);
const notFound = require(
  "./src/middleware/notFound"
);

const errorHandler = require(
  "./src/middleware/errorMiddleware"
);

app.use(notFound);

app.use(errorHandler);
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  );
});