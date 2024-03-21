import { View,Text,StyleSheet } from "react-native";
import React, {useRef,useEffect} from "react";
import LottieView from "lottie-react-native";

export default Success = ()=>{
 
    return (
        <View  style={styles.container}>
      <LottieView
      autoPlay
        source={require("../assets/animation/Failed.json")}
        loop={false}
        style={styles.animation}
      />
      
    </View>
    )
}


const styles = StyleSheet.create({
    animation: {
      width: 360,
      height: 360,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EFFFFD",
    }
  });