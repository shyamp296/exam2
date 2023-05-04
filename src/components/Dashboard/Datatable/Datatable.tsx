import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "UserName", headerName: "User name", width: 130 },
  { field: "Dob", headerName: "Date of Birth", width: 130 },
  { field: "Email", headerName: "Email", width: 170 },
  { field: "PhoneNo", headerName: "Phone Number", width: 130 },
  { field: "gender", headerName: "Gender", width: 130 },
  { field: "country", headerName: "Country", width: 130 },
  { field: "state", headerName: "State", width: 100 },
  { field: "city", headerName: "City", width: 100 },
  { field: "role", headerName: "Role", width: 100 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },

];

export default function DataTable() {

        const [data, setData] = React.useState([]);

        const getDisplay = async () => {
          const response = await fetch("http://localhost:4001/display", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
          });

          const savedData = await response.json();
          setData(savedData.result.data);
          console.log(savedData.result.data);
        };
        console.log("dhgfhfgh", data);

        React.useEffect(() => {
          getDisplay();
        }, []);
    
    const rows = [data.map(() => {
        
    })];
    
    
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 5 }}
        checkboxSelection
      />
    </div>
  );
}
