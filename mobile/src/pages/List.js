import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  View,
  SafeAreaView,
  AsyncStorage,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";

import SpotList from "../components/SpotList";

import api from "../services/api";

import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then((user_id) => {
      const socket = socketio("http://10.0.0.130:3333", {
        query: { user_id },
      });
      socket.on("booking_response", (booking) => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "aprovada" : "rejeitada"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then((storageTechs) => {
      const techsArray = storageTechs.split(",").map((tech) => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  function handleLogout() {
    AsyncStorage.clear();
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <Image style={Styles.logo} source={logo} />
        <TouchableOpacity onPress={() => handleLogout()} style={Styles.button}>
          <Text style={Styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {techs.map((tech) => (
        <ScrollView>
          <SpotList key={tech} tech={tech} />
        </ScrollView>
      ))}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#f05a5b",
    fontWeight: "bold",
    fontSize: 16,
  },
});
