import React, { useEffect } from "react"
import { BigButton } from "../styled/BigButton"
import { useSelector } from "react-redux"
import { BigTextField } from "../styled/BigTextField"
import { DataList } from "./DataList"
import {Box, Typography} from "@mui/material"
import { Dropdown } from "./Dropdown"
import Slider from '@mui/material/Slider';

const ROWS_TO_FETCH_PER_SCROLL = 15;

export const UserPanel = () => {
    const [seed, setSeed] = React.useState("500000");
    const [error, setError] = React.useState(0);
    const [offset, setOffset] = React.useState(ROWS_TO_FETCH_PER_SCROLL);
    const [entries, setEntries] = React.useState([]);
    const [region, setRegion] = React.useState("en");

    const sendRequest = (endpoint, params) => {
        const paramsObj = new URLSearchParams(params);
        return fetch(`/api/${endpoint}?${paramsObj.toString()}`)
        .then((res) => {
          if (!res.ok) return res.json().then((text) => {throw new Error(text.message);});
          else return res.json();
        })
        .catch((error, res) => console.log(error))
      };

    const getEntries = () => {
        sendRequest("getEntries", {seed: parseInt(seed), offset: 0, err: error, region})
        .then(res => {setEntries(res); console.log(res)});
    }

    const handleScrollEnd = () => {
        if(!entries.length) return;
        sendRequest("getEntries", {seed: parseInt(seed), offset: 15, err: error, region})
        .then(res => {setEntries(entries.concat(res))});
        setOffset(offset+ROWS_TO_FETCH_PER_SCROLL);
    }

    const handleSliderChange = (e,v) => {
        setError(v);
    }

    const handleSeedChange = (e) => {
        setSeed(e.target.value);
    }

    const handleErrorChange = (e) => {
        setError(e.target.value);
    }

    const handleRandomSeed = (e) => {
        setSeed(Math.floor(Math.random()*1E15))
    }

    const handleRegionChange = (e) => {
        setRegion(e.target.value);
    }

    useEffect(() => {
        getEntries();
    }, [seed, error, region])

    return(
        <>
            <Box sx={{display: "flex", flexDirection: "column", margin: "2%", width: "40%", justifyContent: "space-around"}}>
                <Box sx={{display: "flex"}}>
                    <BigTextField variant="filled"label="Seed" rows={1} onChange={handleSeedChange} value={seed} />
                    <BigButton variant="contained" onClick={() => handleRandomSeed()}>Random seed</BigButton>
                </Box>
                <BigTextField variant="filled"label="Error Rate" rows={1} onChange={handleErrorChange} value={error} />
                <Slider value={error} onChange={handleSliderChange} aria-labelledby="input-slider" step={0.5} marks min={0} max={5}/>
                <Dropdown region={region} handleRegionChange={handleRegionChange}></Dropdown>
                <BigButton variant="contained" onClick={() => getEntries()}>Send</BigButton>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", margin: "2%", width: "100%"}}>
                <DataList messages={entries} handleScrollEnd={handleScrollEnd} />
            </Box>
        </>
    )
}