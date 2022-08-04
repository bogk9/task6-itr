import React, { useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import {TextField} from "@mui/material";

export const Dropdown = (props) => {
    return(
        <Autocomplete
        fullWidth
        disablePortal
        id="combo-box-demo"
        options={props.users}
        onChange={(e,v) => props.setSelectedUser(v)}
        value={props.selectedUser}
        sx={{ width: "98%"}}
        renderInput={(params) => <TextField  variant="filled" sx={{border: '4px solid #e2e2e1', borderRadius: "20px", overflow: "hidden"}} InputProps={{ disableUnderline: true }} {...params} label="recipent" />}
        />
    )
}