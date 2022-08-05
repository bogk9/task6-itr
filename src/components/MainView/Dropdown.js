import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export const Dropdown = (props) => {
    return(
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Region</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.region}
                label="Region"
                defaultValue={"en"}
                onChange={props.handleRegionChange}
            >
                <MenuItem value={"pl"}>Poland</MenuItem>
                <MenuItem value={"en"}>England</MenuItem>
                <MenuItem value={"fr"}>France</MenuItem>
                <MenuItem value={"de"}>Germany</MenuItem>
                <MenuItem value={"ru"}>Russian</MenuItem>
            </Select>
        </FormControl>
    )
}