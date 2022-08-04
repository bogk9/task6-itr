import React, { useEffect } from "react"
import { BigButton } from "../styled/BigButton"
import { useSelector } from "react-redux"
import { BigTextField } from "../styled/BigTextField"
import { UserList } from "./UserList"
import {Box, Typography} from "@mui/material"
import socketIOClient from "socket.io-client";
import { Dropdown } from "./Dropdown"

export const UserPanel = () => {
    const user = useSelector(state => state.user.username);
    const [formMessage, setFormMessage] = React.useState("");
    const [formTopic, setFormTopic] = React.useState("");
    const [formRecipent, setFormRecipent] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const [messages, setMessages] = React.useState([]);

    const sendRequest = (endpoint, params) => {
        const paramsObj = new URLSearchParams(params);
        return fetch(`/api/${endpoint}?${paramsObj.toString()}`)
        .then((res) => {
          if (!res.ok)
            return res.json().then((text) => {throw new Error(text.message);});
          return res.json();
        })
        .catch((error) => console.log(error))
      };

    const socketInit = () => {
        const socket = socketIOClient();
        socket.emit('joinmsg', JSON.stringify({nick: user}));
        socket.on("refresh", data => {
            getMessages(); getUsers();
          });
    }

    const onClickSend = () => {
        sendRequest("message", {from: user, to: formRecipent, "message": formMessage, topic: formTopic})
        .then(res => console.log(res));
        setFormMessage(""); setFormTopic(""); setFormRecipent("");
    }

    const getMessages = () => {
        sendRequest("getMessages", {to: user})
        .then(res => setMessages(res));
    }

    const getUsers = () => {
        sendRequest("getUsers", {})
        .then(res => setUsers(res));
    }

    useEffect(() => {
        getMessages();
        getUsers();
        socketInit();
    }, [])

    return(
        <>
            <Box sx={{display: "flex", flexDirection: "column", margin: "2%", width: "60%", justifyContent: "space-around"}}>
                <Typography>Hello, {user}.</Typography>
                <BigTextField variant="filled"label="message" rows={3} onChange={(e) => setFormMessage(e.target.value)} value={formMessage} />
                <BigTextField variant="filled"label="topic" onChange={(e) => setFormTopic(e.target.value)} value={formTopic}/>
                <Dropdown users={users} selectedUser={formRecipent} setSelectedUser={setFormRecipent}></Dropdown>
                <BigButton variant="contained" onClick={onClickSend}>Send</BigButton>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", margin: "2%", width: "100%"}}>
                <UserList messages={messages}/>
            </Box>
        </>
    )
}