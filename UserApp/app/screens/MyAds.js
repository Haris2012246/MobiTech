import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { getDetails } from "../services";

const MyAds = ({ navigation }) => {
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

  // const userId = users.userId;
  let userId = userData.userId;
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignContent: "flex-end",
        }}
      >
        <TouchableOpacity
          // style={{ left: 10, top: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={25} color={colors.gray} />
        </TouchableOpacity>
        <Text style={styles.welcomeText2}>My Ads</Text>
      </View>
      {/* <Text>{userData.userId}</Text> */}
      {/* {userId && <Card userId={userId} />} */}
      <Card userId={userId} />
    </SafeAreaView>
  );
};

export default MyAds;

const styles = StyleSheet.create({
  welcomeText2: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
    color: "#666666",
    // left: 10,
    top: 10,
  },
});
