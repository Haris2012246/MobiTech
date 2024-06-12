import React, { useState, useEffect } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import mobitechLogo from "../../assets/mobitechLogo.png";

export default function SplashScreen() {
  const [position] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(position, {
      toValue: -100, // Change this value to adjust how much the image moves upward
      duration: 2000, // Animation duration (5 seconds)
      useNativeDriver: false, // Required for Animated API in React Native
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: position }] }}>
        <Image source={mobitechLogo} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});
