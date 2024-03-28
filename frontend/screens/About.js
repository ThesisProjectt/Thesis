import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import about1 from "../assets/about 1.png";
import about2 from "../assets/about 2.png";
import about3 from "../assets/about 3.png";
import about4 from "../assets/about 4.png";

const About = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View className="flex-1 flex-row items-center gap-5 justify-center mb-10">
        <Image source={about1} style={styles.image1} />
        <Text
          className="text-blue-800 text-base w-40"
          style={{ fontFamily: "Poppins" }}
        >
          Experience the magic of a spotless environment
        </Text>
      </View>
      <View className="flex-1 flex-row items-center gap-5 justify-center mb-10">
        <Text
          className="text-blue-800 text-base w-40"
          style={{ fontFamily: "Poppins" }}
        >
          We clean, and you relax
        </Text>

        <Image source={about2} style={styles.image2} />
      </View>
      <View className="flex-1 flex-row items-center gap-5 justify-center mb-10">
        <Image source={about3} style={styles.image3} />
        <Text
          className="text-blue-800 text-base w-40"
          style={{ fontFamily: "Poppins" }}
        >
          We’re obsessed with cleanliness, so you don’t have to be.
        </Text>
      </View>
      <View className="flex-1 flex-row items-center gap-5 justify-center mb-10">
        <Text
          className="text-blue-800 text-base w-44"
          style={{ fontFamily: "Poppins" }}
        >
          The best in the business, cleaning done right.
        </Text>
        <Image source={about4} style={styles.image4} />
      </View>
      <Text
        className="text-blue-800 text-2xl text-center"
        style={{ fontFamily: "Poppins" }}
      >
        Contact Us
      </Text>
      <View
        className="rounded-2xl shadow-sm mt-4 mb-8 shadow-black bg-white"
        style={styles.input}
      >
        <TextInput
          placeholder="Enter your email"
          //   onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          //   onPress={() => setVisible(!visible)}
          style={{ position: "absolute", right: 12 }}
        >
          <Ionicons name="send-sharp" size={24} color={"black"} />
        </TouchableOpacity>
      </View>
      <Text
        className="text-blue-800 text-2xl text-center mb-2"
        style={{ fontFamily: "Poppins" }}
      >
        Follow Us
      </Text>
      <View className="flex-1 items-center justify-center gap-4 flex-row mb-8">
        <Ionicons name="logo-facebook" size={37} color="black" />
        <Ionicons name="logo-instagram" size={37} color="black" />
      </View>
      <Text
        className="text-blue-800 text-2xl text-center mb-2"
        style={{ fontFamily: "Poppins" }}
      >
        Join Us
      </Text>
      <View className="items-center">
        <TouchableOpacity className="items-center rounded-xl justify-center bg-blue-700 w-40 h-10">
          <Text
            className="text-white text-base"
            style={{ fontFamily: "Poppins" }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFFFFD",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 25,
  },
  image1: {
    width: 134,
    height: 119,
  },
  image2: {
    width: 141,
    height: 114,
  },
  image3: {
    width: 148,
    height: 114,
  },
  image4: {
    width: 137,
    height: 116,
  },
  input: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    paddingLeft: 22,
  },
});

export default About;
