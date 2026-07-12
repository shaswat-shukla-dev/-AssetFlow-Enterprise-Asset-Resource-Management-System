import { useQuery } from "@tanstack/react-query";
import { Boxes, Tags, Truck, Building2 } from "lucide-react";

import { createCrudApi } from "../api/crudFactory.js";

const assetsApi = createCrudApi("assets");
const categoriesApi = createCrudApi("asset-categories");
const vendorsApi = createCrudApi("vendors");
const branchesApi = createCrudApi("branches");

const StatCard = ({ icon: Icon, label, value, isLoading }) => (
  <div className="card flex items-center gap-4 p-5">
    <div className="rounded-xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/10">
      <Icon size={22} />
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
        {isLoading ? "…" : value}
      </p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const assets = useQuery({ queryKey: ["dash-assets"], queryFn: () => assetsApi.list({ limit: 1 }) });
  const categories = useQuery({ queryKey: ["dash-categories"], queryFn: () => categoriesApi.list({ limit: 1 }) });
  const vendors = useQuery({ queryKey: ["dash-vendors"], queryFn: () => vendorsApi.list({ limit: 1 }) });
  const branches = useQuery({ queryKey: ["dash-branches"], queryFn: () => branchesApi.list({ limit: 1 }) });

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Boxes}
          label="Total Assets"
          value={assets.data?.pagination?.total ?? 0}
          isLoading={assets.isLoading}
        />
        <StatCard
          icon={Tags}
          label="Categories"
          value={categories.data?.pagination?.total ?? 0}
          isLoading={categories.isLoading}
        />
        <StatCard
          icon={Truck}
          label="Vendors"
          value={vendors.data?.pagination?.total ?? 0}
          isLoading={vendors.isLoading}
        />
        <StatCard
          icon={Building2}
          label="Branches"
          value={branches.data?.pagination?.total ?? 0}
          isLoading={branches.isLoading}
        />
      </div>

      <div className="card mt-6 p-6 text-sm text-slate-500 dark:text-slate-400">
        Charts, recent activity, and KPI trends (Module 10) are not built yet —
        this dashboard currently shows live record counts pulled from the
        real API endpoints above.
      </div>
    </div>
  );
};

export default DashboardPage;
