import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AdPostScreen,
  HomeScreen,
  Profile,
  Sell,
  SellForMeScreen,
  UserDetails,
} from "../screens";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import MyAds from "../screens/MyAds";
import { StackNav } from "../../App";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    borderRadius: 15,
  },
};

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: colors.primary,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
     
      <Tab.Screen
        name="Home"
        component={StackNav}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? colors.primary : colors.gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "add" : "add-outline"}
                size={50}
                color={colors.white}
              />
            );
          },
          tabBarButton: (props) => <CustomTabBarButton {...props} />
        }}
      />
      <Tab.Screen
        name="Details"
        component={UserDetails}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "apps" : "apps-outline"}
                size={24}
                color={focused ? colors.primary : colors.gray}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={StackNav}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="Sell Your Phone"
        component={AdPostScreen}
        options={{
          tabBarButton: () => null,
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
      <Tab.Screen
        name="Sell For Me"
        component={SellForMeScreen}
        options={{
          tabBarButton: () => null,
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNav;
