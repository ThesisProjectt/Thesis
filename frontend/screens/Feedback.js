import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { AirbnbRating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ip from "../functions/IpAdress";

const Feedback = ({ navigation }) => {
  const [rate, setRate] = useState(0);
  const [text, setText] = useState("");

  const haandleRate = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const token = JSON.parse(await AsyncStorage.getItem("token"));
    const data = {
      rating: rate,
      review: text,
      client_id: user.id,
    };
    try {
      axios.post(`${ip}:3000/rating/giverate`, data, {
        headers: {
          authorization: token,
        },
      });
      ToastAndroid.show("Feedback sent successfully!", ToastAndroid.BOTTOM);
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "OK", "Good", "Great"]}
        size={40}
        defaultRating={0}
        onFinishRating={setRate}
      />
      <TextInput
        placeholder="Describe your experience (optional)"
        multiline={true}
        className="w-full text-lg my-12 p-2 border-2 rounded-lg border-gray-400 items-center"
        onChangeText={setText}
      />
      <Button color={"#61D8D8"} title="Submit" onPress={haandleRate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFFFD",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    height: Dimensions.get("screen").height - StatusBar.currentHeight,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "#02337B",
  },
});

export default Feedback;
