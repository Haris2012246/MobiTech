import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import colors from "../config/colors";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { getDetails } from "../services";
import { useCallback } from "react";

const UserDetails = ({ navigation }) => {
  const [userData, setUserData] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await getDetails();
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            {
              fontSize: 30,
            },
          ]}
        >
          Profile: {userData.name}
        </Text>
        <Text
          style={[
            styles.text,
            {
              fontSize: 20,
            },
          ]}
        >
         Mobile: {userData.contactNumber}
        </Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={[styles.text, { fontSize: 15 }]}>
            View Profile
            <Ionicons
              name="chevron-forward"
              size={15}
              color={colors.white} 
              style={styles.arrowIcon}
            />
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.pageButton}>
        <TouchableOpacity
          style={styles.productButton}
          onPress={() => navigation.navigate("MyAds")}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              left: 10,
            }}
          >
            {" "}
            My Products
            <Ionicons
              name="chevron-forward"
              size={15}
              color={colors.white}
              // style={{ alignItems: "flex-end" }}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "30%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  text: {
    color: colors.white,
    left: "10%",
    ...Platform.select({
      ios: {
        top: 100,
      },
      android: {
        padding: 20,
        top: 130,
      },
    }),
  },

  arrowIcon: {
    // alignItems: "flex-end",
  },

  pageButton: {
    top: "100%",
  },

  productButton: {
    width: "90%",
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "flex-start",
    // alignContent:"center",
    // marginTop: 90,
    left: "5%",
  },
});
