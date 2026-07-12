import { createCrudApi } from "../api/crudFactory.js";
import MasterDataPage from "../components/MasterDataPage.jsx";

const crudApi = createCrudApi("assets");

const AssetsPage = () => (
  <MasterDataPage
    title="Assets"
    crudApi={crudApi}
    queryKey="assets"
    columns={[
      { key: "assetNumber", label: "Asset #" },
      { key: "name", label: "Name" },
      { key: "category", label: "Category", render: (row) => row.category?.name || "-" },
      { key: "status", label: "Status" }
    ]}
    fields={[
      { name: "assetNumber", label: "Asset Number", required: true },
      { name: "serialNumber", label: "Serial Number" },
      { name: "name", label: "Asset Name", required: true },
      { name: "categoryId", label: "Category Id", required: true },
      { name: "vendorId", label: "Vendor Id" },
      { name: "branchId", label: "Branch Id" },
      { name: "locationId", label: "Location Id" },
      { name: "purchaseDate", label: "Purchase Date", type: "date" },
      { name: "purchaseCost", label: "Purchase Cost", type: "number" },
      { name: "warrantyExpiry", label: "Warranty Expiry", type: "date" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "AVAILABLE", label: "Available" },
          { value: "ALLOCATED", label: "Allocated" },
          { value: "UNDER_MAINTENANCE", label: "Under Maintenance" },
          { value: "RETIRED", label: "Retired" },
          { value: "LOST", label: "Lost" }
        ]
      }
    ]}
    emptyDefaults={{
      assetNumber: "",
      serialNumber: "",
      name: "",
      categoryId: "",
      vendorId: "",
      branchId: "",
      locationId: "",
      purchaseDate: "",
      purchaseCost: "",
      warrantyExpiry: "",
      status: "AVAILABLE"
    }}
  />
);

export default AssetsPage;
