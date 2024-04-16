import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";

export default function Catego({ navigation }) {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async()=>{
      try {
        const response = await fetch(`${ip}:3000/category/getCategories`);
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("error fetching error", error);
      }
    })()
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={categories}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.item}
                onPress={() => {
                  navigation.navigate("Packs", {
                    catid: item.id,
                    catName: item.name,
                  });
                }}
              >
                <View style={styles.card}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.flatImage}
                  />
                </View>
                <Text
                  style={{ fontFamily: "Poppins" }}
                  className="text-md text-blue-800"
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#effffd",
    paddingTop: StatusBar.currentHeight + 40,
  },
  item: {
    width: 150,
    height: 180,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 126,
    height: 126,
    borderRadius: 20,
    elevation: 4,
  },
  flatImage: {
    width: 100,
    height: 100,
  },
});
