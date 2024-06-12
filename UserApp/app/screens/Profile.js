import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import colors from "../config/colors";
import style from "../config/style";

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={style.header}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ left: 10, top: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text
          style={{
            ...Platform.select({
              ios: {
                top: 10,
              },
              android: {
                top: 0,
              },
            }),
            left: 50,
            color: colors.white,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          My Profile
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="gray"
            style={styles.inputIcon}
          />
          <Text style={{ fontWeight: "500", fontSize: 15 }}>
            Your Full Name
          </Text>
        </View>
        <TextInput editable style={styles.input} placeholder="Full Name" />

        <View style={styles.iconContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="gray"
            style={styles.inputIcon}
          />
          <Text style={{ fontWeight: "500", fontSize: 15 }}>Your Email</Text>
        </View>
        <TextInput
          editable
          style={styles.input}
          placeholder="Enter Your Email"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => alert("Changes Saved")}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    top: 70,
  },
  // header: {
  //   backgroundColor: colors.primary,
  //   width: "100%",
  //   height: "10%",
  //   ...Platform.select({
  //     ios: {
  //       padding: 60,
  //     },
  //     android: {
  //       padding: 50,
  //     },
  //   }),
  // },

  iconContainer: {
    flexDirection: "row",
    marginTop: 40,
    left: 20,
  },
  input: {
    width: "90%",
    height: 50,
    paddingLeft: 10,
    left: 20,
    color: "black",
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },
  saveButton: {
    width: "70%",
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.primary, // Set background color here
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    left: 55,
  },
});
