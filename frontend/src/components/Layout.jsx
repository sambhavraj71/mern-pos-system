import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const MENU = [
  { name: "Dashboard", path: "/dashboard", roles: ["admin", "manager", "cashier"] },
  { name: "Products", path: "/products", roles: ["admin", "manager"] },
  { name: "Inventory", path: "/inventory", roles: ["admin", "manager"] },
  { name: "Orders", path: "/orders", roles: ["admin", "manager", "cashier"] },
  { name: "Stores", path: "/stores", roles: ["admin"] },
  { name: "Inventory Logs", path: "/inventory-logs", roles: ["admin"] },
  { name: "Users", path: "/users", roles: ["admin"] },
  { name: "Reports", path: "/reports", roles: ["admin", "manager"] },
  { name: "POS Billing", path: "/pos", roles: ["admin", "manager", "cashier"] },
];

export default function Layout({ children }) {
  const { logout, user } = useAuth();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => {
      setIsMobile(media.matches);
      setSidebarOpen(!media.matches);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobile, sidebarOpen]);

  return (
    <div className="pos-app-shell flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {isMobile && sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        id="main-sidebar"
        aria-label="Main navigation"
        className={`pos-sidebar z-50 flex h-screen shrink-0 flex-col bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:sticky lg:top-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:hidden"}`}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-slate-700 px-5 py-4">
          <h1 className="whitespace-nowrap text-xl font-bold text-white">POS System</h1>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="rounded-md px-3 py-2 text-xl text-white hover:bg-slate-700"
          >
            ×
          </button>
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {MENU.filter((item) => item.roles.includes(user?.role)).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if (isMobile) setSidebarOpen(false); }}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive ? "bg-blue-600 text-white" : "text-slate-200 hover:bg-slate-800 hover:text-white"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 space-y-3 border-t border-slate-700 bg-slate-900 px-4 py-3">
          <div>
            <p className="break-words font-semibold">{user?.name}</p>
            <span className="mt-1 inline-block rounded bg-blue-600 px-2 py-1 text-xs capitalize text-white">{user?.role}</span>
          </div>
          <button type="button" onClick={() => setDarkMode((value) => !value)} className="w-full rounded-lg bg-slate-700 px-3 py-2.5 text-sm font-medium text-white hover:bg-slate-600">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button type="button" onClick={logout} className="w-full rounded-lg bg-red-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-red-600">
            Logout
          </button>
        </div>
      </aside>

      <div className="pos-main flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-2 bg-white px-3 py-3 shadow dark:bg-gray-800 dark:text-white sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((value) => !value)}
              aria-controls="main-sidebar"
              aria-expanded={sidebarOpen}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl text-slate-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white"
            >
              {sidebarOpen ? "×" : "☰"}
            </button>
            <h2 className="truncate text-sm font-bold sm:text-base">Welcome, {user?.name}</h2>
          </div>
          <span className="shrink-0 rounded bg-green-600 px-2 py-1 text-xs capitalize text-white sm:px-3 sm:text-sm">{user?.role}</span>
        </header>
        <main className="pos-page min-w-0 flex-1 p-3 text-black dark:text-white sm:p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
