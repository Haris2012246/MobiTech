import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../config/colors";

const Sell = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text style={styles.headingText}>
        How do you want to sell your phone?
      </Text>
      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Sell For Me")}>
          <View style={styles.box}>
            <Text style={styles.boxHeadingText}>Sell it for me!</Text>
            <Text style={styles.boxText}>
              Have a phone to sell but no time to bargain best offers?
            </Text>
            <Text style={[styles.boxText, { color: "#f53131" }]}>
              I want experts to sell my phone{" "}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Sell Your Phone")}
        >
          <View style={styles.box}>
            <Text style={styles.boxHeadingText}>Sell Today!</Text>
            <Text style={styles.boxText}>
              Post your Ad to find the best offer from our verified buyers
            </Text>
            <Text style={[styles.boxText, { color: "#f53131" }]}>
              Post an Ad right away
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Sell;

const styles = StyleSheet.create({
  boxContainer: {
    // flex:1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  headingText: {
    fontSize: 30,
    alignItems: "center",
    fontWeight: "bold",
    paddingTop: Platform.OS === "android" ? 60 : 30,
    paddingLeft: 20,
    color: colors.primary,
  },
  box: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#e8e8e8",
    width: "90%",
    margin: 20,
    height: 120,
    borderRadius: 20,
  },
  boxHeadingText: {
    fontSize: 20,
    fontWeight: "500",
    left: 10,
    color: colors.black,
  },
  boxText: {
    left: 10,
    fontSize: 15,
  },
});
