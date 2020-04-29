import React, { useState, useEffect } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  SafeAreaView,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import api from "../services/api";

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/spots", {
        params: { tech },
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate("Book", { id });
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>
        Empresas que usam <Text style={{ fontWeight: "bold" }}>{tech}</Text>
      </Text>
      <FlatList
        style={Styles.list}
        data={spots}
        keyExtractor={(spot) => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={Styles.listItem}>
            <Image
              style={Styles.thumbnail}
              source={{
                uri:
                  "https://localhost:3333/files/boardroom-3-1475684-640x480-1588088492174.jpg",
              }}
            />
            <Text style={Styles.company}>{item.company}</Text>
            <Text style={Styles.price}>
              {item.price ? `R$ ${item.price}/dia` : "Gratuito"}
            </Text>
            <TouchableOpacity
              onPress={() => handleNavigate(item._id)}
              style={Styles.button}
            >
              <Text style={Styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 150,
    height: 80,
    resizeMode: "cover",
    borderRadius: 2,
  },
  company: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    color: "#999",
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default withNavigation(SpotList);
