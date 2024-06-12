import { Box, styled } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  width: `calc(100% - ${theme.spacing(7)})`,
  [theme.breakpoints.up("sm")]: {
    width: theme.spacing(9),
  },
}));
