import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",

  border: "solid",
  borderWidth: "2px",
  borderRadius: "20px",
  padding: "2%",
  width: "80vw",
  height: "60vh"
});
