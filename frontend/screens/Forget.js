import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from "react-native";
import LOGO from "../assets/LOGO Cleaning.png";
import background from "../assets/new pass.png";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Forget = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  function validate() {
    if (email === "" || password === "" || confirmPassword === "") {
      setError("Please fill out all fields");
      return false;
    } else if (password.length < 8) {
      setError("Please enter a password of at least 8 characters");
      return false;
    } else if (!/\d/.test(password)) {
      setError("Your password must contain a number");
      return false;
    } else if (!/[A-Z]/.test(password)) {
      setError("Your password must contain at least one uppercase");
      return false;
    } else if (!/[a-z]/.test(password)) {
      setError("Your password must contain lowercase letter");
      return false;
    } else if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      setError(null);
      return true;
    }
  }

  const updatePwd = async () => {
    try {
      const isValidated = validate();
      const data = {
        email: email,
        password: password,
      };
      if (isValidated) {
        await axios.put("http://192.168.1.45:3000/client/newpwd", data);
        console.log("done");
        navigation.navigate("NewPwd");
      }
    } catch (e) {
      setError("Wrong Email!!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        className="flex-1 justify-center items-center"
      >
        <View style={styles.inner}>
          <Image style={styles.logo} source={LOGO} />
          <Text
            style={{ fontFamily: "Poppins" }}
            className="text-2xl text-blue-800 top-5"
          >
            New password
          </Text>
        </View>
        <View className="flex-1 items-center h-screen w-96 p-6 rounded-xl left-4 top-4 gap-8">
          {error && <Text style={styles.inputError}>{error}</Text>}
          <TextInput
            required
            placeholder="Your e-mail address"
            className="rounded-2xl shadow-lg bg-white"
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
          />
          <View className="rounded-2xl shadow-lg bg-white" style={styles.input}>
            <TextInput
              placeholder="New Password"
              secureTextEntry={visible}
              onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={{ position: "absolute", right: 12 }}
            >
              {visible ? (
                <Ionicons name="eye-off" size={24} color={"black"} />
              ) : (
                <Ionicons name="eye" size={24} color={"black"} />
              )}
            </TouchableOpacity>
          </View>
          <View className="rounded-2xl shadow-lg bg-white" style={styles.input}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={visible}
              onChangeText={(value) => setConfirmPassword(value)}
            />
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={{ position: "absolute", right: 12 }}
            >
              {visible ? (
                <Ionicons name="eye-off" size={24} color={"black"} />
              ) : (
                <Ionicons name="eye" size={24} color={"black"} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="rounded-2xl shadow-lg"
            style={styles.button}
            onPress={() => updatePwd()}
          >
            <Text
              style={{ fontFamily: "Poppins" }}
              className="text-cyan-50 text-xl"
            >
              Confirm
            </Text>
          </TouchableOpacity>
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
  input: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    paddingLeft: 22,
    paddingRight: 40,
    right: 15,
    shadowColor: "black",
  },
  inputContainer: {
    backgroundColor: "#FFFFFFC0",
    shadowColor: "gray",
  },
  button: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#61D8D8",
    marginTop: "10%",
    right: 15,
    shadowColor: "black",
  },
  inputError: {
    color: "red",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 13,
    position: "absolute",
  },
});

export default Forget;
