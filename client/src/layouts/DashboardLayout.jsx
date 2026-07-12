import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Boxes,
  Tags,
  Building2,
  Truck,
  MapPin,
  LogOut
} from "lucide-react";

import { logout } from "../features/auth/authSlice.js";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/assets", label: "Assets", icon: Boxes },
  { to: "/categories", label: "Categories", icon: Tags },
  { to: "/vendors", label: "Vendors", icon: Truck },
  { to: "/branches", label: "Branches", icon: Building2 },
  { to: "/locations", label: "Locations", icon: MapPin }
];

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 md:flex">
        <div className="px-6 py-5">
          <h1 className="text-lg font-bold text-brand-600">AssetFlow</h1>
          <p className="text-xs text-slate-400">Enterprise Asset Manager</p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
            {user?.username || "User"}
          </p>
          <button
            onClick={handleLogout}
            className="mt-2 flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
