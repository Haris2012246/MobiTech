import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Formik, useFormik } from "formik";
import { signupSchema } from "../validations/validations";
import { signup } from "../services";

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function handleSubmit() {
  //   const userData = {
  //     email: email,
  //     name: name,
  //     password: password,
  //   };
  //   axios
  //     .post("http://192.168.0.101:5000/api/users/signup", userData)
  //     .then((res) => console.log(res.data))
  //     .catch((e) => console.log(e));
  // }
  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber:"",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      signupHandler(values);
      console.log(values);
    },
  });

  const signupHandler = async (data) => {
    try {
      const { name, contactNumber, email, password } = data;
      // const user = { name, email, password };

      const response = await signup({ name, contactNumber, email, password });
        console.log("signup Success", response);
      Alert.alert("Succesfully Signed up");
      navigation.navigate("Signin");
    } catch (e) {
      console.clear();
      Alert.alert("User already exist");
      // const error = e.response.data.message.split('"')[1];
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <KeyboardAvoidingView
        style={[styles.inputContainer, { flex: 1 }]}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Formik onSubmit={formik.handleSubmit}>
            <View>
              <View style={styles.inputIconContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="gray"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={formik.handleChange("name")}
                  value={formik.values.name}
                />
              </View>
              {formik.touched.name && formik.errors.name && (
                <Text style={styles.error}>{formik.errors.name}</Text>
              )}
              <View style={styles.inputIconContainer}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={20}
                  color="gray"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  onChangeText={formik.handleChange("contactNumber")}
                  value={formik.values.contactNumber}
                  keyboardType="phone-pad"
                />
              </View>
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <Text style={styles.error}>{formik.errors.contactNumber}</Text>
              )}

              {/* Email Input */}
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
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
              </View>
              {formik.touched.email && formik.errors.email && (
                <Text style={styles.error}>{formik.errors.email}</Text>
              )}
              {/* Password Input */}
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
                  secureTextEntry={showPassword}
                  value={formik.values.password}
                  onChangeText={formik.handleChange("password")}
                />
                <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={styles.eyeButton}
                >
                  {password.length > 1 ? null : showPassword ? (
                    <Ionicons
                      name="eye-off"
                      style={{ marginRight: 10 }}
                      size={20}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons
                      name="eye"
                      size={20}
                      style={{ marginRight: 10 }}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {formik.touched.password && formik.errors.password && (
                <Text style={styles.error}>{formik.errors.password}</Text>
              )}
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={formik.handleSubmit}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Formik>
          {/* <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine} />
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="logo-google" size={40} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name="logo-facebook" size={40} color="blue" />
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    position: "absolute",
    top: "15%",
    left: "5%",
  },
  inputContainer: {
    width: "90%",
    // marginBottom: 20,
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "black",
  },
  signUpButton: {
    backgroundColor: colors.primary,
    padding: 10,
    width: "100%",
    height: 50,
    borderRadius: 20,
    marginBottom: 40,
    // marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1, // Adjust the height of the horizontal line as needed
    backgroundColor: "#727272", // You can adjust the color as needed
    marginHorizontal: 10, // Adjust the margin as needed
  },
  orText: {
    fontSize: 12,
    color: "#727272",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});

export default RegistrationScreen;
