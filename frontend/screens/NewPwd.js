import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import LOGO from "../assets/LOGO Cleaning.png";
import OK from "../assets/newPasswordDone.png";
import background from "../assets/new pass.png";

const NewPwd = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 4000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        className="flex-1 items-center"
      >
        <View style={styles.inner}>
          <Image style={styles.logo} source={LOGO} />
          <Image className="top-16" style={styles.logo} source={OK} />
          <Text style={{ fontFamily: 'Poppins' }} className="text-2xl w-64 text-center text-blue-800 top-20">
            Your password has been changed
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFFFFD",
    width: "100%",
  },
  inner: {
    alignItems: "center",
    marginTop: 110,
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default NewPwd;
