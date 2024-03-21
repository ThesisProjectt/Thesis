import { View,Text,StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default Success = ()=>{
    return (
        <View  style={styles.container}>
      <LottieView
        source={require("../assets/animation/loading 1.json")}
        autoPlay
      />
      
    </View>
    )
}