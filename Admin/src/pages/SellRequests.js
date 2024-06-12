import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  TablePagination,
  Typography,
  IconButton,
  Box,
  tableCellClasses,
  styled,
  InputBase,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import {
  deleteSellRequestById,
  getAllSellRequests,
  getSellRequestById,
} from "../services/requsets";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function SellRequests() {
  const [sellRequestt, setSellRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can set the number of rows per page
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchRequests = useCallback(async () => {
    try {
      const response = await getAllSellRequests();
      console.log(response.data);
      setSellRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleDelete = async (SellitForMeID) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (shouldDelete) {
        // Assuming you have a deleteProductById function in your service
        await deleteSellRequestById(SellitForMeID);
        fetchRequests();
      }
      // After deletion, fetch the updated product list
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getSellRequestById(searchQuery);
      console.log(response.data);
      // Update the productListing state with the search result
      setSellRequests([response.data]);
    } catch (error) {
      console.log(error);
      alert("Searched request Not found");
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <Box component="main" sx={{ ml: 9 }}>
      <Toolbar />
      <Toolbar>
        <Typography variant="h5" ml={1}>
          Sell Requests
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          <Box display="flex" alignItems="center">
            <InputBase
              placeholder="Search by request Id"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon sx={{ fill: "#FF5A60" }}  />
            </IconButton>
          </Box>
        </div>
      </Toolbar>
      {/* <Toolbar/> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Request Id</StyledTableCell>
            <StyledTableCell align="right">User Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone Number</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Model Name</StyledTableCell>
            <StyledTableCell align="right">Mobile Description</StyledTableCell>
            <StyledTableCell align="right">Inspection Slot</StyledTableCell>
            <StyledTableCell align="right">Inspection Time</StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="button">Delete</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? sellRequestt.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : sellRequestt
          ).map((sellRequestt) => (
            <StyledTableRow key={sellRequestt.SellitForMeID}>
              <StyledTableCell align="center">
                {sellRequestt.SellitForMeID}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.userName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.emailAddress}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.address}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.modelName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.mobileDescription}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.inspectionSlot}
              </StyledTableCell>
              <StyledTableCell align="center">
                {sellRequestt.inspectionTime}
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  onClick={() => handleDelete(sellRequestt.SellitForMeID)}
                >
                  <DeleteIcon sx={{ fill: "#FF5A60" }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Customize the rows per page options
        component="div"
        count={sellRequestt.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default SellRequests;
