import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Button,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import style from "../config/style";
import { addNewProduct } from "../services/products";
import { Formik, useFormik } from "formik";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import FileSystem
import axios from "axios";

// import DocumentPicker from 'react-native-document-picker';

export default function AdPostScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

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

  const saveImagePermanently = async (uri) => {
    if (!uri) return null;

    const fileName = uri.split("/").pop();
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });
      console.log("Image saved to:", newPath);
      return newPath; // Return the new path
    } catch (error) {
      console.error("Error saving image:", error);
      return null;
    }
  };

  const handleDeleteImage = () => {
    setImageUri(null);
  };

  const formik = useFormik({
    initialValues: {
      modelName: "",
      description: "",
      price: "",
      quantity: "",
    },
    onSubmit: async (values) => {
      const savedImageUri = await saveImagePermanently(imageUri);
      handleAddProduct({ ...values, imageUri: savedImageUri });
      console.log(values);
    },
  });

  const handleAddProduct = async (data) => {
    try {
      const { modelName, description, price, quantity, imageUri } = data;
      const formData = new FormData();
      formData.append("modelName", modelName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);

      if (imageUri) {
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("image", {
          uri: imageUri,
          name: filename,
          type: type,
        });
      }

      // const response = await axios.post(
      //   "https://192.168.0.102:5000/api/products", // Replace with your actual backend URL
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      const response = await addNewProduct(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("succes", response);
      Alert.alert("Success", "Product added successfully");
      setImageUri(null); // Reset imageUri after saving
    } catch (error) {
      console.log("fail");
      Alert.alert("Error", "Failed to add product. Please try again later.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      // This function will be called when the screen gains focus.
      // Reset form and image when returning to the screen
      formik.resetForm();
      setImageUri(null);
    }, [])
  );

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

          <View style={styles.inputContainer}>
            <Formik onSubmit={formik.handleSubmit}>
              <View>
                <Button
                  title="+Upload Image"
                  onPress={handleImagePicker}
                  color={colors.primary}
                />
                {imageUri && (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{ uri: imageUri }}
                      style={{ width: 100, height: 100, marginVertical: 10 }}
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={handleDeleteImage}
                    >
                      <Ionicons name="trash" size={20} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Model Name"
                  value={formik.values.modelName}
                  onChangeText={formik.handleChange("modelName")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Full Description"
                  value={formik.values.description}
                  onChangeText={formik.handleChange("description")}
                  multiline
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={formik.values.price}
                  onChangeText={formik.handleChange("price")}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Quantity"
                  value={formik.values.quantity}
                  onChangeText={formik.handleChange("quantity")}
                  keyboardType="numeric"
                />
              </View>
            </Formik>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={formik.handleSubmit}
          >
            <Text style={{ color: colors.white }}>Add Product</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    marginTop: 40,
    left: 20,
  },
  inputContainer: {
    // top: 30,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
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
    // paddingLeft: 5,

    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 70,
    left: 55,
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
