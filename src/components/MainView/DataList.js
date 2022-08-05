import { DataGridPro } from "@mui/x-data-grid-pro";
import React from "react";
import { useGridApiRef } from "@mui/x-data-grid";
import {Typography} from "@mui/material";

import { LicenseInfo } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey(
  'x',
);


export const DataList = (props) => {
  let apiRef = useGridApiRef();
  const columns = [
    { headerName: "No", width: 50, flex: 0.5, renderCell: (params) => {
      return (
        <Typography>{params.api.getRowIndex(params.row.id) +1}</Typography>
      )
    }
  },
    { field: "id", headerName: "ID", width: 50, flex: 1 },
    { field: "first_name", headerName: "First Name", width: 50, flex: 1 },
    { field: "middle_name", headerName: "Middle Name", width: 50, flex: 1 },
    { field: "last_name", headerName: "Last Name", width: 50, flex: 1 },
    { field: "city", headerName: "City", width: 50, flex: 1 },
    { field: "zip", headerName: "Zip Code", width: 50, flex: 1 },
    { field: "street", headerName: "Street", width: 50, flex: 1 },
    { field: "number", headerName: "Street no", width: 50, flex: 1 },
    { field: "phone", headerName: "Phone no", width: 50, flex: 1 },
    
  ];
  return (
    <DataGridPro
      rows={props.messages}
      columns={columns}
      getRowId={(row) => row.id}
      pageSize={5}
      rowsPerPageOptions={[5]}
      sx={{
        color: "black",
        borderRadius: 5,
        width: "100%",
      }}
      onSelectionModelChange={(newSelection) => {
        props.setChecked(newSelection);
      }}
      onRowsScrollEnd={props.handleScrollEnd}
      selectionModel={props.checked}
    />
  );
};
