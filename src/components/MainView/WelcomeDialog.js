import React from "react";
import { Typography, Box } from "@mui/material"
import { BigButton } from "../styled/BigButton"
import { BigTextField } from "../styled/BigTextField"
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";

export const WelcomeDialog = () => {
    const dispatch = useDispatch();
    const [formNickname, setFormNickname] = React.useState();
    const onJoinClick = () => {
        dispatch(setUser(formNickname));

    }
    return(
        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <Typography>Hello, guest. Feel free to join.</Typography>
            <BigTextField variant="filled"label="Your nickname" onChange={(e) => setFormNickname(e.target.value)}/>
            <BigButton variant="contained" onClick={onJoinClick}>Join</BigButton>
        </Box>
    )
}