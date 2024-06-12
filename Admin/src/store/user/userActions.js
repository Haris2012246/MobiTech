// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getDetails } from "../../services";

// export const getUser = createAsyncThunk(
//   "user/login",
//   async (arg, { rejectWithValue }) => {
//     try {
//       const res = await getDetails();
//       const { userId: id, email } = res.data;
//       return { id, email };
//     } catch (e) {
//       return rejectWithValue(e.response?.data?.message);
//     }
//   }
// );
