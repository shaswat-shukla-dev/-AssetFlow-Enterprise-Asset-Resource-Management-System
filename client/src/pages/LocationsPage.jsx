import { createCrudApi } from "../api/crudFactory.js";
import MasterDataPage from "../components/MasterDataPage.jsx";

const crudApi = createCrudApi("locations");

const LocationsPage = () => (
  <MasterDataPage
    title="Locations"
    crudApi={crudApi}
    queryKey="locations"
    columns={[
      { key: "building", label: "Building" },
      { key: "floor", label: "Floor" },
      { key: "room", label: "Room" },
      { key: "status", label: "Status" }
    ]}
    fields={[
      { name: "branchId", label: "Branch Id", required: true },
      { name: "building", label: "Building" },
      { name: "floor", label: "Floor" },
      { name: "room", label: "Room" },
      { name: "rack", label: "Rack" },
      { name: "shelf", label: "Shelf" }
    ]}
    emptyDefaults={{
      branchId: "",
      building: "",
      floor: "",
      room: "",
      rack: "",
      shelf: ""
    }}
  />
);

export default LocationsPage;
