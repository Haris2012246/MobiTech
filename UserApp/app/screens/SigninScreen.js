import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Formik, useFormik } from "formik";

import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { loginSchema } from "../validations/validations";
import { login } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../config/style";

const SigninScreen = ({ navigation }) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const response = await login({ email, password });
        console.log("Login Success", response);

        const { user, token } = response.data;
        await AsyncStorage.setItem("token", token);
        Alert.alert("Logged in Successfull")
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        // dispatch({ type: "LOGIN", payload: { id: user.userId, email } });
        navigation.navigate("Home");
      } catch (e) {
        // console.log(e?.response?.data || e.response?.data?.message);
        console.log("User not found",e)
        Alert.alert("User Not found. Try Signing Up")
        if (e.response?.status === 401) {
          Alert.alert("Error", "Invalid email or password");
          formik.errors.email = "Invalid email or password";
          formik.errors.password = "Invalid email or password";
        }
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Login</Text>

        <KeyboardAvoidingView
          style={[styles.inputContainer, { flex: 1 }]}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={formik.handleSubmit}
            >
              {({}) => (
                <View>
                  <View style={styles.inputIconContainer}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="gray"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={formik.values.email}
                      onChangeText={formik.handleChange("email")}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                    />
                  </View>
                  {formik.errors.email && (
                    <Text style={styles.error}>{formik.errors.email}</Text>
                  )}
                  <View style={styles.inputIconContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="gray"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                    />
                    <TouchableOpacity
                      onPress={toggleShowPassword}
                      style={styles.eyeButton}
                    >
                      {formik.values.password.length <
                      1 ? null : showPassword ? (
                        <Ionicons
                          name="eye"
                          style={{ marginRight: 10 }}
                          size={20}
                          color={colors.primary}
                        />
                      ) : (
                        <Ionicons
                          name="eye-off"
                          size={20}
                          style={{ marginRight: 10 }}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {formik.errors.password && (
                    <Text style={styles.error}>{formik.errors.password}</Text>
                  )}
                  <View style={styles.row}>
                    {/* <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                // onPress={() => handleChange("rememberMe")(!values.rememberMe)}
                  style={styles.checkbox}
                >
                  {values.rememberMe && (
                    <Ionicons
                    name="checkbox-outline"
                      size={24}
                      color={colors.primary}
                    />
                  )}
                  {!values.rememberMe && (
                    <Ionicons name="square-outline" size={24} color="gray" />
                  )}
                  </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View> */}
                    <TouchableOpacity>
                      <Text style={styles.forgotPassword}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={formik.handleSubmit}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                  <View style={styles.signUpTextContainer}>
                    <Text style={styles.signUpText}>
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Register")}
                    >
                      <Text style={styles.signUpLink}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 20,
      },
    }),
    top: 25,
  },
  backButton: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    // marginBottom: 0,
    position: "absolute",
    top: "15%",
    left: "10%",
  },
  inputContainer: {
    width: "90%",
    // marginBottom: 20,
    // position: "absolute",
    top: "25%",
  },
  inputIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40%",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 5,
  },
  rememberMeText: {
    fontSize: 14,
  },
  forgotPassword: {
    fontStyle: "italic",
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 10,
    width: "100%",
    height: 50,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  signUpTextContainer: {
    flexDirection: "row",
    // marginTop: "90%",
    padding: "2%",
    justifyContent: "center",
  },
  signUpText: {
    color: "black",
  },
  signUpLink: {
    fontWeight: "bold",
  },
});

export default SigninScreen;
