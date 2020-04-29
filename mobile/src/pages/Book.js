import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";

import api from "../services/api";

export default function Book({ navigation }) {
  const id = navigation.getParam("id");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("user");
    console.log(user_id);
    await api.post(
      `/spots/${id}/bookings`,
      {
        date,
      },
      {
        headers: {
          user_id,
        },
      }
    );
    Alert.alert("Solicitação de Reserva Enviada!");
    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.label}>Data de Interesse</Text>
      <TextInput
        style={Styles.input}
        placeholder="Qual data você quer reservar"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity onPress={handleSubmit} style={Styles.button}>
        <Text style={Styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancel} style={Styles.cancelButton}>
        <Text style={Styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    margin: 30,
    paddingTop: Constants.statusBarHeight + 20,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  cancelButton: {
    height: 42,
    marginTop: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
