import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const columns = [
  { field: "from", headerName: "From", width: 50, flex: 1 },
  { field: "to", headerName: "To", width: 50, flex: 1 },
  { field: "topic", headerName: "Topic", width: 50, flex: 1 },
  { field: "message", headerName: "Message", width: 300, flex: 1, renderCell: (params) => {
    const onClick = (e) => {
      e.stopPropagation(); 
      const api= params.api;
      const thisRow = {};
      api
        .getAllColumns()
        .filter((c) => c.field !== "__check__" && !!c)
        .forEach(
          (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
        );
      return alert(JSON.stringify(thisRow.message, null, 4));
    };

    return <Button onClick={onClick}>Show</Button>;
  } },
  { field: "date", headerName: "When", width: 100, flex: 1 }
  
];

export const UserList = (props) => {
  return (
    <DataGrid
      rows={props.messages}
      columns={columns}
      getRowId={(row) => row._id}
      pageSize={9}
      rowsPerPageOptions={[5]}
      checkboxSelection
      sx={{
        color: "black",
        borderRadius: 5,
        width: "100%",
      }}
      onSelectionModelChange={(newSelection) => {
        console.log("boo!");
        props.setChecked(newSelection);
        console.log(props.checked);
      }}
      selectionModel={props.checked}
    />
  );
};
