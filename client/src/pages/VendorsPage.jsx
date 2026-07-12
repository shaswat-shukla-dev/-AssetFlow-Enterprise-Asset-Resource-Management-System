import { createCrudApi } from "../api/crudFactory.js";
import MasterDataPage from "../components/MasterDataPage.jsx";

const crudApi = createCrudApi("vendors");

const VendorsPage = () => (
  <MasterDataPage
    title="Vendors"
    crudApi={crudApi}
    queryKey="vendors"
    columns={[
      { key: "name", label: "Name" },
      { key: "code", label: "Code" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "status", label: "Status" }
    ]}
    fields={[
      { name: "name", label: "Name", required: true },
      { name: "code", label: "Code", required: true },
      { name: "contactPerson", label: "Contact Person" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone" },
      { name: "gstNumber", label: "GST Number" },
      { name: "address", label: "Address" }
    ]}
    emptyDefaults={{
      name: "",
      code: "",
      contactPerson: "",
      email: "",
      phone: "",
      gstNumber: "",
      address: ""
    }}
  />
);

export default VendorsPage;
