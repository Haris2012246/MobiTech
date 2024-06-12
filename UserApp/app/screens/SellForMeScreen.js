import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { Formik, useFormik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { saveSellRequest } from "../services/sellForMe";

export default function SellForMeScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [isSlotModalVisible, setSlotModalVisible] = useState(false);
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      emailAddress: "",
      phoneNumber: "",
      address: "",
      modelName: "",
      mobileDescription: "",
      inspectionSlot: "",
      inspectionTime: "",
    },
    onSubmit: async (values) => {
      handleSellRequest(values);
      console.log(values);
    },
  });

  const handleSellRequest = async (data) => {
    try {
      const {
        userName,
        emailAddress,
        phoneNumber,
        address,
        modelName,
        mobileDescription,
        inspectionSlot,
        inspectionTime,
      } = data;

      const response = await saveSellRequest({
        userName,
        emailAddress,
        phoneNumber,
        address,
        modelName,
        mobileDescription,
        inspectionSlot,
        inspectionTime,
      });
      console.log("succes", response);
      Alert.alert("Success", "Sell Request Generated");
      // setImageUri(null); // Reset imageUri after saving
    } catch (error) {
      console.log("fail");
      Alert.alert("Error", "Failed to add request. Please try again later.");
    }
  };

  const inspectionSlots = [
    "Coming Monday",
    "Coming Tuesday",
    "Coming Wednesday",
    "Coming Thursday",
    "Coming Friday",
    "Coming Saturday",
    "Coming Sunday",
  ];
  const inspectionTimes = [
    "10:00 AM",
    "12:00 AM",
    "02:00 AM",
    "04:00 AM",
    "06:00 AM",
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
          <TouchableOpacity
            style={{ left: 10, top: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color={colors.primary}
              style={{ top: -10 }}
            />
          </TouchableOpacity>
          <View>
            <Formik onSubmit={formik.handleSubmit}>
              <View>
                <Button
                  title="+Upload Image"
                  onPress={handleImagePicker}
                  color={colors.primary}
                />
                {imageUri && (
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 100, height: 100, marginVertical: 10 }}
                  />
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Name*"
                  value={formik.values.userName}
                  onChangeText={formik.handleChange("userName")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email*"
                  value={formik.values.emailAddress}
                  onChangeText={formik.handleChange("emailAddress")}
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number*"
                  value={formik.values.phoneNumber}
                  onChangeText={formik.handleChange("phoneNumber")}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address*"
                  value={formik.values.address}
                  onChangeText={formik.handleChange("address")}
                  multiline
                  keyboardType="default"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Model Name*"
                  value={formik.values.modelName}
                  onChangeText={formik.handleChange("modelName")}
                  keyboardType="default"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Description*"
                  value={formik.values.mobileDescription}
                  onChangeText={formik.handleChange("mobileDescription")}
                  multiline
                  keyboardType="default"
                />
                {/* <TextInput
                  style={styles.input}
                  placeholder="Inspection Slot"
                  value={formik.values.inspectionSlot}
                  onChangeText={formik.handleChange("inspectionSlot")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Inspection Time"
                  value={formik.values.inspectionTime}
                  onChangeText={formik.handleChange("inspectionTime")}
                /> */}
                {/* Modal for Inspection Slot */}
                <TouchableOpacity
                  style={styles.modalOpener}
                  onPress={() => setSlotModalVisible(true)}
                >
                  <Text style={styles.modalOpenerText}>
                    {formik.values.inspectionSlot || "Select Inspection Slot*"}
                  </Text>
                </TouchableOpacity>
                <Modal
                  visible={isSlotModalVisible}
                  transparent={true}
                  animationType="slide"
                  onRequestClose={() => setSlotModalVisible(false)}
                >
                  <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Inspection Slot</Text>
                      <Picker
                        selectedValue={formik.values.inspectionSlot}
                        onValueChange={(itemValue) => {
                          formik.setFieldValue("inspectionSlot", itemValue);
                          setSlotModalVisible(false);
                        }}
                        style={styles.picker}
                      >
                        <Picker.Item label="Select Slot" value="" />
                        {inspectionSlots.map((slot) => (
                          <Picker.Item key={slot} label={slot} value={slot} />
                        ))}
                      </Picker>
                      {/* <Button
                        title="Close"
                        onPress={() => setSlotModalVisible(false)}
                        color={colors.primary}
                      /> */}
                    </View>
                  </View>
                </Modal>
                {/* Modal for Inspection Time */}
                <TouchableOpacity
                  style={styles.modalOpener}
                  onPress={() => setTimeModalVisible(true)}
                >
                  <Text style={styles.modalOpenerText}>
                    {formik.values.inspectionTime || "Select Inspection Time"}
                  </Text>
                </TouchableOpacity>
                <Modal
                  visible={isTimeModalVisible}
                  transparent={true}
                  animationType="fade"
                  onRequestClose={() => setTimeModalVisible(false)}
                >
                  <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Inspection Time</Text>
                      <Picker
                        selectedValue={formik.values.inspectionTime}
                        onValueChange={(itemValue) => {
                          formik.setFieldValue("inspectionTime", itemValue);
                          setTimeModalVisible(false);
                        }}
                        style={styles.picker}
                      >
                        <Picker.Item label="Select Time" value="" />
                        {inspectionTimes.map((time) => (
                          <Picker.Item key={time} label={time} value={time} />
                        ))}
                      </Picker>
                      {/* <Button
                      style={{top:"50%"}}
                        title="Close"
                        onPress={() => setTimeModalVisible(false)}
                        color={colors.primary}
                      /> */}
                    </View>
                  </View>
                </Modal>
              </View>
            </Formik>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={formik.handleSubmit}
          >
            <Text style={{ color: colors.white }}>Add Sell Requst</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    paddingLeft: 20,
    left: 10,
    color: "black",
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },
  imageButton: {
    width: "60%",
    height: 100,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    left: 55,
  },
  modalOpener: {
    width: "90%",
    height: 50,
    left: 10,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: 20,
    marginTop: 10,
  },
  modalOpenerText: {
    color: "gray",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    padding: 60,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  picker: {
    width: "100%",
    height: 50,
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
