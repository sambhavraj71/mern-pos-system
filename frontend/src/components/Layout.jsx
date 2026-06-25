import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}) {
  const { logout, user } =
    useAuth();

  const [darkMode,
    setDarkMode] =
    useState(
      localStorage.getItem(
        "darkMode"
      ) === "true"
    );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }

    localStorage.setItem(
      "darkMode",
      darkMode
    );
  }, [darkMode]);

  return (
    <div
      className="
      flex
      min-h-screen
      bg-gray-100
      dark:bg-gray-900
      "
    >
      {/* Sidebar */}
      <div
        className="
        w-64
        bg-slate-900
        text-white
        p-5
        flex
        flex-col
        justify-between
        "
      >
        <div>
          <h1 className="text-2xl font-bold mb-8">
            POS System
          </h1>

          <div className="space-y-3">

            {/* Common */}
            <Link
              to="/dashboard"
              className="block hover:text-blue-400"
            >
              Dashboard
            </Link>

            {/* ADMIN */}
            {user?.role ===
              "admin" && (
              <>
                <Link
                  to="/products"
                  className="block hover:text-blue-400"
                >
                  Products
                </Link>

                <Link
                  to="/inventory"
                  className="block hover:text-blue-400"
                >
                  Inventory
                </Link>

                <Link
                  to="/orders"
                  className="block hover:text-blue-400"
                >
                  Orders
                </Link>

                <Link
                  to="/stores"
                  className="block hover:text-blue-400"
                >
                  Stores
                </Link>

                <Link
                  to="/inventory-logs"
                  className="block hover:text-blue-400"
                >
                  Inventory Logs
                </Link>

                <Link
                  to="/users"
                  className="block hover:text-blue-400"
                >
                  Users
                </Link>

                <Link
                  to="/reports"
                  className="block hover:text-blue-400"
                >
                  Reports
                </Link>

                <Link
                  to="/pos"
                  className="block hover:text-blue-400"
                >
                  POS Billing
                </Link>
              </>
            )}

            {/* MANAGER */}
            {user?.role ===
              "manager" && (
              <>
                <Link
                  to="/products"
                  className="block hover:text-blue-400"
                >
                  Products
                </Link>

                <Link
                  to="/inventory"
                  className="block hover:text-blue-400"
                >
                  Inventory
                </Link>

                <Link
                  to="/orders"
                  className="block hover:text-blue-400"
                >
                  Orders
                </Link>

                <Link
                  to="/reports"
                  className="block hover:text-blue-400"
                >
                  Reports
                </Link>

                <Link
                  to="/pos"
                  className="block hover:text-blue-400"
                >
                  POS Billing
                </Link>
              </>
            )}

            {/* CASHIER */}
            {user?.role ===
              "cashier" && (
              <>
                <Link
                  to="/orders"
                  className="block hover:text-blue-400"
                >
                  Orders
                </Link>

                <Link
                  to="/pos"
                  className="block hover:text-blue-400"
                >
                  POS Billing
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-3">

          <div
            className="
            border-t
            border-gray-700
            pt-3
            "
          >
            <p className="font-semibold">
              {user?.name}
            </p>

            <span
              className="
              text-xs
              bg-blue-600
              px-2
              py-1
              rounded
              capitalize
              "
            >
              {user?.role}
            </span>
          </div>

          <button
            onClick={() =>
              setDarkMode(
                !darkMode
              )
            }
            className="
            bg-gray-700
            px-4
            py-2
            rounded
            w-full
            "
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>

          <button
            onClick={logout}
            className="
            bg-red-500
            px-4
            py-2
            rounded
            w-full
            "
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">

        <div
          className="
          bg-white
          dark:bg-gray-800
          dark:text-white
          shadow
          p-4
          flex
          justify-between
          items-center
          "
        >
          <h2 className="font-bold">
            Welcome,
            {" "}
            {user?.name}
          </h2>

          <span
            className="
            bg-green-600
            text-white
            px-3
            py-1
            rounded
            capitalize
            "
          >
            {user?.role}
          </span>
        </div>

        <div
          className="
          p-6
          text-black
          dark:text-white
          "
        >
          {children}
        </div>

      </div>
    </div>
  );
}