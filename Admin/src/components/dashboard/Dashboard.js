import React, { useState, useEffect, useCallback } from "react";

import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";

import { AppSettingsAltTwoTone as InspectionIcon } from "@mui/icons-material";

import Inspection from "../../pages/Inspection";
import Title from "../../styles/Title";
import { Link } from "react-router-dom";
import { getAllInspectionRequests } from "../../services/inspection";
import { getAllSellRequests } from "../../services/requsets";
import { getAllProducts } from "../../services/products";

export default function Dashboard() {
  const [inspectionCount, setInspectionCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const fetchInspectionRequest = useCallback(async () => {
    try {
      const response = await getAllInspectionRequests();
      setInspectionCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchInspectionRequest();
  }, [fetchInspectionRequest]);

  const fetchSellRquest = useCallback(async () => {
    try {
      const response = await getAllSellRequests();
      setRequestCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSellRquest();
  }, [fetchSellRquest]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      setProductCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item xs={7} sx={{ display: "flex", gap: 2}}>
            <Paper
              sx={{
                pt: 4,
                pl: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
                width: 190,
                borderRadius: 5,
              }}
            >
              <Title>Total Products</Title>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "medium",
                  fontSize: 20,
                }}
              >
                {productCount}
              </Typography>
              {/* <Deposits /> */}
            </Paper>
            <Paper
              sx={{
                pt: 4,
                pl: 2,
                display: "flex",
                flexDirection: "column",
                height: 150,
                width: 190,
                borderRadius: 5,
              }}
            >
              <Title>Total Sell Request</Title>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "medium",
                  fontSize: 20,
                  color: "black",
                }}
              >
                {requestCount}
              </Typography>
            </Paper>
            <IconButton size="small" disableRipple >
              <Paper
                sx={{
                  pt: 4,
                  pl: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 150,
                  width: 190,
                  borderRadius: 5,
                }}
              >
                <Title>Total Inspections</Title>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "medium",
                    fontSize: 20,
                    color: "black",
                  }}
                >
                  {/* <InspectionIcon sx={{ fill: "#FF5A60" }} /> */}
                  {inspectionCount}
                </Typography>
              </Paper>
            </IconButton>
          </Grid>
          {/* Recent Inspection */}
          <Grid item xs={15}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: 5,
              }}
            >
              <Title>Recent Inspections</Title>
              <Inspection showAll={false} sx={{ width: "1401.6px" }} />
              <Link
                to="/inspection"
                sx={{ marginLeft: 30, mt: 3, cursor: "pointer" }}
              >
                See more
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
