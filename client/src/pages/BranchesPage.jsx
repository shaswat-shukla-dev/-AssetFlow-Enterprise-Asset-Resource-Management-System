import { createCrudApi } from "../api/crudFactory.js";
import MasterDataPage from "../components/MasterDataPage.jsx";

const crudApi = createCrudApi("branches");

const BranchesPage = () => (
  <MasterDataPage
    title="Branches"
    crudApi={crudApi}
    queryKey="branches"
    columns={[
      { key: "name", label: "Name" },
      { key: "code", label: "Code" },
      { key: "city", label: "City" },
      { key: "status", label: "Status" }
    ]}
    fields={[
      { name: "name", label: "Name", required: true },
      { name: "code", label: "Code", required: true },
      { name: "organizationId", label: "Organization Id", required: true },
      { name: "address", label: "Address" },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
      { name: "country", label: "Country" },
      { name: "pincode", label: "Pincode" }
    ]}
    emptyDefaults={{
      name: "",
      code: "",
      organizationId: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    }}
  />
);

export default BranchesPage;
