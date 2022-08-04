import { StyledBox } from "../styled/StyledBox"
import { WelcomeDialog } from "./WelcomeDialog"
import { useSelector } from "react-redux"
import { UserPanel } from "./UserPanel"
import { Box, Typography } from "@mui/material"

export const MainView = () => {
    var user = useSelector(state => state.user.username)
    return(
        <>
            <Box>
                <Typography>Task #5: Messaging system made with React/Redux/MUI/mongoDB/express + Socket.IO</Typography>
            </Box>
            <StyledBox>
                {user? <UserPanel/> : <WelcomeDialog/>}
            </StyledBox>
        </>
    )
}