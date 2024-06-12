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
  deleteProductById,
  getAllProducts,
  getProductById,
} from "../services/products";

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

function ProductListing() {
  const [productListing, setProductListing] = useState([]);
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

  const fetchProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      console.log(response.data);
      setProductListing(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      // Assuming you have a deleteProductById function in your service
      if (shouldDelete) {
        // If the user confirms deletion
        await deleteProductById(productId);
        console.log("Product deleted");
        // After deletion, fetch the updated product list
        fetchProducts();
      }
      // After deletion, fetch the updated product list
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getProductById(searchQuery);
      console.log(response.data);
      // Update the productListing state with the search result
      setProductListing([response.data]);
    } catch (error) {
      alert("Searched Product Not found");
      console.log("Product not found",error);
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <Box component="main" sx={{ ml: 9 }}>
      <Toolbar />
      <Toolbar>
        <Typography variant="h5">All Products</Typography>
        <div style={{ marginLeft: "auto" }}>
          <Box display="flex" alignItems="center">
            <InputBase
              placeholder="Search by Product Id"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon sx={{ fill: "#FF5A60" }} />
            </IconButton>
          </Box>
        </div>
      </Toolbar>
      {/* <Toolbar/> */}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">
              <Typography sx={{ font: "bold" }}> Product Id</Typography>
            </StyledTableCell>
            <StyledTableCell align="left">
              <Typography sx={{ font: "bold" }}> User Id</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography> Model Name</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>Description</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>Price</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>Quantity</Typography>
            </StyledTableCell>
            {/* <StyledTableCell align="right">
              <Typography>isFeaturedAd</Typography>
            </StyledTableCell> */}
            <StyledTableCell align="right">
              <Typography variant="button">Delete</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? productListing.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : productListing
          ).map((productListing) => (
            <StyledTableRow key={productListing.productId}>
              <StyledTableCell align="left">
                {productListing.productId}
              </StyledTableCell>
              <StyledTableCell align="left">
                {productListing.userId}
              </StyledTableCell>
              <StyledTableCell align="center">
                {productListing.modelName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {productListing.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                Rs.{productListing.price.toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="center">
                {productListing.quantity}
              </StyledTableCell>
              {/* <StyledTableCell>{productListing.isFeaturedAd}</StyledTableCell> */}
              <StyledTableCell align="right">
                <IconButton
                  onClick={() => handleDelete(productListing.productId)}
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
        count={productListing.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ProductListing;
