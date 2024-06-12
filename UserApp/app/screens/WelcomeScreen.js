import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/mobitechLogo.png")}
        />
        <Text style={styles.text}>The Best Market For Your Phones</Text>
      </View>
      <TouchableOpacity
        style={[styles.registerButton, { top: 500 }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={[styles.buttonText, { color: colors.primary }]}>
          Register Now
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Text style={[styles.text, styles.signInStyle]}>
          Already Registered? Sign in
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const signInStyle = {
  fontSize: 15,
  top: "75%",
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  registerButton: {
    width: "84%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "white", // Set background color here
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontStyle: "italic",
    fontWeight: "300",
    fontSize: 11,
  },
  signInStyle: {
    top: 510,
    fontSize: 12,
  },
});

export default WelcomeScreen;
