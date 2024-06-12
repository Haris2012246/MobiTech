import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
  BackHandler,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import colors from "../config/colors";
import StackNavigator from "../navigation/StackNavigator";
import { useEffect } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { getProductsByName } from "../services/products";

const HomeScreen = ({ navigation }) => {
  const [productListing, setProductListing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandler = async () => {
    AsyncStorage.setItem("isLoggedIn", "");
    AsyncStorage.setItem("token", "");
    Alert.alert(
      "Confirm",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              // dispatch(userActions.logout());
              navigation.navigate("WelcomeScreen");
              console.log("logout succes");
            } catch (error) {
              console.error("Error occurred while logging out:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    })
  );

  const handleSearch = async () => {
    try {
      const response = await getProductsByName(searchQuery);
      console.log(response.data);
      // Update the productListing state with the search result
      setProductListing([response.data]);
    } catch (error) {
      alert("Searched Product Not found");
      console.log("Product not found", error);
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.filterIcon}>
          <Ionicons name="filter" size={25} color="black" />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.avatarIcon}
          onPress={() => navigation.navigate("Details")}
        >
          {/* Replace 'user' with your actual icon name */}
          <Ionicons name="person-circle" size={30} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarIcon} onPress={logoutHandler}>
          {/* Replace 'user' with your actual icon name */}
          <Ionicons name="log-out-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        verticle
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.welcomeText2}>To MobiTech App</Text>
        {/* Search Bar */}
        <View style={styles.iconContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
              <Ionicons name="search" size={25} color="#666666" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              />
          </View>
          <Ionicons name="filter-circle-sharp" size={40}></Ionicons>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
        >
          <View>
            <Image
              style={styles.card}
              source={require("../../assets/card1.png")}
            />
          </View>
          <View>
            <Image
              style={styles.card}
              source={require("../../assets/card2.png")}
            />
            {/* <Text>Card 2</Text> */}
          </View>
          <View>
            <Image
              style={styles.card}
              source={require("../../assets/card3.png")}
            />
          </View>
        </ScrollView>
        <Text style={{ fontSize: 20, left: 15, paddingTop: 20 }}>
          Featured Phones
        </Text>
        {productListing.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        paddingHorizontal: 10,
      },
      android: {
        paddingHorizontal: 30,
      },
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3%",
    marginLeft: "3%",
  },
  filterIcon: {
    padding: 10,
  },
  avatarIcon: {
    padding: 10,
    paddingLeft: 1,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
  welcomeText2: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
    color: "#666666",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#F3F4F5",
    height: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  searchIcon: {
    padding: 10,
  },
  cardsContainer: {
    marginTop: 25,
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    width: 230,
    height: 160,
    // backgroundColor: "lightgray",
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
