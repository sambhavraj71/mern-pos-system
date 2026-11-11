
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const { logout, user } = useAuth();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024
  );

  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < 1024
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;

      setIsMobile((previous) => {
        if (previous !== mobile) {
          setSidebarOpen(!mobile);
        }
        return mobile;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobile, sidebarOpen]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "manager", "cashier"],
    },
    {
      name: "Products",
      path: "/products",
      roles: ["admin", "manager"],
    },
    {
      name: "Inventory",
      path: "/inventory",
      roles: ["admin", "manager"],
    },
    {
      name: "Orders",
      path: "/orders",
      roles: ["admin", "manager", "cashier"],
    },
    {
      name: "Stores",
      path: "/stores",
      roles: ["admin"],
    },
    {
      name: "Inventory Logs",
      path: "/inventory-logs",
      roles: ["admin"],
    },
    {
      name: "Users",
      path: "/users",
      roles: ["admin"],
    },
    {
      name: "Reports",
      path: "/reports",
      roles: ["admin", "manager"],
    },
    {
      name: "POS Billing",
      path: "/pos",
      roles: ["admin", "manager", "cashier"],
    },
  ];

  const visibleMenuItems = menuItems.filter(
    (item) => item.roles.includes(user?.role)
  );

  const handleMenuClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        className={`
          fixed inset-y-0 left-0 z-50
          w-64 bg-slate-900 text-white
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:h-screen
          lg:shrink-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:hidden"
          }
        `}
        aria-label="Main navigation"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-5 py-5">
          <h1 className="text-xl font-bold">
            POS System
          </h1>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-white hover:bg-slate-700"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-1">
            {visibleMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleMenuClick}
                className={({ isActive }) =>
                  `
                    block rounded-lg px-4 py-3
                    text-sm font-medium
                    transition-colors duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-slate-800 hover:text-white"
                    }
                  `
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="shrink-0 space-y-3 border-t border-gray-700 bg-slate-900 p-4">

          <div>
            <p className="break-words font-semibold">
              {user?.name}
            </p>

            <span className="mt-2 inline-block rounded bg-blue-600 px-2 py-1 text-xs capitalize">
              {user?.role}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-full rounded-lg bg-gray-700 px-4 py-3 text-sm font-medium hover:bg-gray-600"
          >
            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-medium hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 bg-white px-3 py-3 shadow dark:bg-gray-800 dark:text-white sm:px-5">

          <div className="flex min-w-0 items-center gap-3">

            {/* Sidebar Toggle */}
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl text-gray-800 transition hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              aria-label={
                sidebarOpen
                  ? "Close sidebar"
                  : "Open sidebar"
              }
              aria-expanded={sidebarOpen}
              aria-controls="main-sidebar"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>

            <h2 className="truncate text-sm font-bold sm:text-base">
              Welcome, {user?.name}
            </h2>
          </div>

          <span className="shrink-0 rounded bg-green-600 px-2 py-1 text-xs capitalize text-white sm:px-3 sm:text-sm">
            {user?.role}
          </span>
        </header>

        {/* Page Content */}
        <main className="min-w-0 flex-1 p-3 text-black dark:text-white sm:p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
