import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View  style={styles.container}>
      <LottieView
        source={require("../assets/animation/loading 1.json")}
        style={styles.animation}
        autoPlay
      />
      <Text style={{fontFamily:"Poppins-Regular", fontSize:20}}>L o a d i n g . . .</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 250,
    height: 250,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFFFFD",
  }
});