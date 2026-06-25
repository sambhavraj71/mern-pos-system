import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Stores from "./pages/Stores";
import PrivateRoute from "./routes/PrivateRoute";
import InventoryLogs from "./pages/InventoryLogs";
import POS from "./pages/POS";
import Reports from "./pages/Reports";
import Users from "./pages/User";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={<PrivateRoute>
            <Reports />
          </PrivateRoute>}
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={<Users />}
        />
        <Route
          path="/inventory-logs"
          element={
            <PrivateRoute>
              <InventoryLogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <OrderDetails />
          }
        />
        <Route
          path="/pos"
          element={
            <PrivateRoute>
              <POS />
            </PrivateRoute>
          }
        />
        <Route
          path="/stores"
          element={
            <PrivateRoute>
              <Stores />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;