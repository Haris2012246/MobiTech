import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { loginSchema } from "../../validations/LoginValidations";

import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";

import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../services";
// import Dashboard from "./Dashboard";
import "./login.css";
import { userActions } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // loginHandler(values);
      try {
        const { email, password } = values;
        const response = await login({ email, password });
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        dispatch(userActions.login({ id: user.userId, email }));
        navigate("/dashboard");
      } catch (e) {
        console.log(e?.response?.data || e.response?.data?.message);
        alert("User Doesn't Exist");
        if (e.response?.status === 401) {
          formik.errors.email = "Invalid email or password";
          formik.errors.password = "Invalid email or password";
        }
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "70px",
            marginLeft: "-20px",
            display: "flex",
            height: 450,
            width: 500,
            flexDirection: "column",
            alignItems: "center",
            padding: "15px",
            boxShadow: 8,
            borderRadius: 10,
            borderTop: "4px solid #f0999c",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#FF5A60" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LogIn
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Admin Id"
              name="email"
              autoComplete="email"
              autoFocus
              values={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              values={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{ height: 25, width: 25, cursor: "pointer" }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <ShowIcon sx={{ color: "#FF5A60" }} />
                      ) : (
                        <HideIcon sx={{ color: "black" }} />
                      )}
                    </Box>
                  </InputAdornment>
                ),
              }}
              // onChange={(e) => setPassword(e.target.value)}
              // error={isPasswordInvalid} // Use the 'error' prop
              // helperText={isPasswordInvalid ? "This field is required" : ""}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              // onClick={loginHandler}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "#FF5A60",
                "&:hover": { bgcolor: "#fc7c80" },
              }}
            >
              Login
            </Button>
            {/* {errors && (
              <p style={{ color: "red", marginLeft: "60px", fontSize: "15px"}}>{errors}</p>
            )} */}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{ marginLeft: "176px" }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
