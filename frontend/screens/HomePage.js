import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import homepage from "../assets/homepage 1-1.png";
import homepage2 from "../assets/50%off.png";
import imageData from "../functions/Categories";
import About from "./About";
import { AntDesign } from "@expo/vector-icons"; 

const HomePage = ({ navigation }) => {

  const [refresh, setRefresh] = useState(false)

  const Item = ({ image, title, id }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Packs", { catid: id, catName: title })
      }
      style={styles.item}
    >
      <View style={styles.card}>
        <Image source={image} style={styles.flatImage} />
      </View>
      <Text style={{ fontFamily: "Poppins" }} className="text-md text-blue-800">
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => setRefresh(false)}
        />
      }
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View className="items-center justify-center">
        <Image source={homepage} style={styles.image} />
      </View>
      <View className="flex-1 flex-row justify-between pl-4 pr-4 pt-5">
        <Text
          style={{ fontFamily: "Poppins" }}
          className="text-2xl text-blue-800"
        >
          Categories
        </Text>
        <TouchableOpacity
          className="h-10"
          onPress={() => navigation.navigate("Categories")}
        >
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-lg font-normal text-blue-800"
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView className="flex-1 ">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal
          data={imageData}
          renderItem={({ item }) => (
            <Item image={item.image} title={item.name} id={item.id} />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <Text
        style={{ fontFamily: "Poppins" }}
        className="text-2xl text-blue-800 pl-4 pt-5"
      >
        Special Offer
      </Text>
      <View className=" -mt-9 items-center">
        <Image source={homepage2} style={styles.image2} />
      </View>
      <Text
        style={{ fontFamily: "Poppins" }}
        className="text-2xl text-blue-800 text-center pt-16 pb-3"
      >
        About Us
      </Text>
      <About />
      <View className=" flex-row items-center gap-1 my-9 self-center">
        <AntDesign name="copyright" size={12} color={"gray"}/>
        <Text style={{fontFamily:"Poppins-Light", color:"gray"}}>2023-2024 SPOTLESS, Inc.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFFFFD",
    paddingTop: StatusBar.currentHeight,
    // paddingHorizontal: 15,
    height: Dimensions.get("screen").height,
    zIndex: 1,
  },
  item: {
    width: 150,
    height: 180,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  image: {
    height: Dimensions.get("window").width > 400 ? 270 : 240,
    width: Dimensions.get("screen").width,
  },
  image2: {
    marginTop: 50,
    height: Dimensions.get("window").width > 400 ? 200 : 180,
    borderRadius: 16,
    width: Dimensions.get("screen").width - 20,
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

export default HomePage;
