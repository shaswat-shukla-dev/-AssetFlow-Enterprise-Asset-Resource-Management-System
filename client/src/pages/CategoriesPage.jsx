import { createCrudApi } from "../api/crudFactory.js";
import MasterDataPage from "../components/MasterDataPage.jsx";

const crudApi = createCrudApi("asset-categories");

const CategoriesPage = () => (
  <MasterDataPage
    title="Categories"
    crudApi={crudApi}
    queryKey="categories"
    columns={[
      { key: "name", label: "Name" },
      { key: "code", label: "Code" },
      { key: "status", label: "Status" }
    ]}
    fields={[
      { name: "name", label: "Name", required: true },
      { name: "code", label: "Code", required: true },
      { name: "description", label: "Description" }
    ]}
    emptyDefaults={{ name: "", code: "", description: "" }}
  />
);

export default CategoriesPage;
