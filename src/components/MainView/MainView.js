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
                <Typography>Task #6: Generating random user data with Faker.js</Typography>
            </Box>
            <StyledBox>
                <UserPanel/>
            </StyledBox>
        </>
    )
}