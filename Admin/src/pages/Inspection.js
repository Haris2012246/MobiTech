import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Box,
  TableSortLabel,
  styled,
  tableCellClasses,
  TablePagination,
  Typography,
  IconButton,
  InputBase,
  Radio,
} from "@mui/material";
// import Title from "../styles/Title";
import "./pages.styles.css";

import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import {
  deleteinspectionRequestById,
  getAllInspectionRequests,
  getInspectionRequestById,
} from "../services/inspection";
import { pink } from "@mui/material/colors";

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

// const tableStyles = {
//   textAlign: "center",
// };

// export const totalCount = rows.length;
export default function Inspection({ showAll = true }) {
  const [inspection, setInspection] = useState([]);
  const [orderBy, setOrderBy] = useState("Date");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selected, setSelected] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleChange = (inspectionId) => {
    setSelectedRowId(inspectionId);
  };

  const controlProps = (inspectionId) => ({
    checked: selectedRowId === inspectionId,
    onChange: () => handleChange(inspectionId),
    value: inspectionId,
    name: `color-radio-button-demo-${inspectionId}`,
    inputProps: { "aria-label": inspectionId },
  });
  

  const fetchInspectionRequest = useCallback(async () => {
    try {
      const response = await getAllInspectionRequests();
      console.log(response.data);
      setInspection(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchInspectionRequest();
  }, [fetchInspectionRequest]);

  useEffect(() => {
    if (showAll) {
      setInspection((prev) => prev.slice(-4));
    }
  }, []);

  const handleDelete = async (inspectionId) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this Inspection?"
      );
      // Assuming you have a deleteProductById function in your service
      if (shouldDelete) {
        // If the user confirms deletion
        await deleteinspectionRequestById(inspectionId);
        // After deletion, fetch the updated product list
        fetchInspectionRequest();
      }
      // After deletion, fetch the updated product list
      fetchInspectionRequest();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try { 
      const response = await getInspectionRequestById(searchQuery);
      console.log(response.data);
      // Update the productListing state with the search result
      setInspection([response.data]);
    } catch (error) {
      console.log(error);
      alert("Searched Inspection Not found");
      // Handle error, e.g., show a message to the user
    }
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component="main" sx={{ ml: 9 }}>
      {showAll && (
        <React.Fragment>
          <Toolbar />
          <Toolbar>
          <Typography variant="h5">Inspection Request</Typography>
          <div style={{ marginLeft: "auto" }}>
            <Box display="flex" alignItems="center">
              <InputBase
                placeholder="Search by Inspection Id"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton onClick={handleSearch}>
                <SearchIcon sx={{ fill: "#FF5A60" }}/>
              </IconButton>
            </Box>
          </div>
          </Toolbar>
        </React.Fragment>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Inspection Id</StyledTableCell>
            <StyledTableCell align="center">User Id</StyledTableCell>
            <StyledTableCell align="center">Product Id</StyledTableCell>
            <StyledTableCell  align="center" sortDirection={orderBy === "Date" ? order : false}>
              <TableSortLabel
                active={orderBy === "Date"}
                direction={orderBy === "Date" ? order : "asc"}
                onClick={() => handleSortRequest("Date")}
                sx={{ fill: "#FF5A60" }}
              ></TableSortLabel>
              Date
              {/* date formate: yyyy-mm-dd*/}
            </StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="button">Delete</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inspection
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort((a, b) => {
              if (order === "asc") {
                return a[orderBy] > b[orderBy] ? 1 : -1;
              } else {
                return b[orderBy] > a[orderBy] ? 1 : -1;
              }
            })
            .map((inspection) => (
              <StyledTableRow
                key={inspection.inspectionId}
                className="rowHighlight"
              >
                <TableCell align="center">{inspection.inspectionId}</TableCell>
                <TableCell align="center">{inspection.productId}</TableCell>
                <TableCell align="center">
                  {dayjs(inspection.date).locale("en").format("DD MMMM YYYY")}
                </TableCell>
                <TableCell align="center">{inspection.homeAddress}</TableCell>
                <TableCell align="center"
                // style={{
                //   color: inspection.status === "Done" ? "green" : "red",
                // }}
                >
                  {inspection.status}
                  <Radio
                    {...controlProps(inspection.inspectionId)}
                    color="success"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleDelete(inspection.inspectionId)}
                  >
                    <DeleteIcon sx={{ fill: "#FF5A60" }} />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // You can customize the rows per page options
        component="div"
        count={inspection.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
