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
  ScrollView,
} from "react-native";
import LOGO from "../assets/LOGO Cleaning.png";
import background from "../assets/sign in.png";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";

const Login = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      return setError("Please enter both email and password");
    }
    const data = { email: email, password: password };
    try {
      setLoading(true)
      await axios.post(`${ip}:3000/client/login`, data)
        .then(async (response) => {
          setError(null);
          const token = response.headers["token"];
          const user = response.data;
          await AsyncStorage.setItem("token", JSON.stringify(token));
          await AsyncStorage.setItem("user", JSON.stringify(user));
          navigation.replace("BottomNav");
        })
        .catch(() => {
          setLoading(false);
          setError("Invalid  Email or Password")})
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
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
              Sign in
            </Text>
          </View>
          <View className="flex-1 items-center h-screen w-96 p-6 rounded-xl left-4 top-4 gap-8">
            <TextInput
              required
              placeholder="Email"
              className="rounded-2xl shadow-lg bg-white"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
            <View
              className="rounded-2xl shadow-lg bg-white"
              style={styles.input}
            >
              <TextInput
                required
                placeholder="Password"
                secureTextEntry={visible}
                onChangeText={(text) => setPassword(text)}
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
            {error && <Text style={styles.inputError}>{error}</Text>}
            <TouchableOpacity
              className="rounded-2xl shadow-lg"
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text
                style={{ fontFamily: "Poppins" }}
                className="text-cyan-50 text-xl"
                onPress={() => {
                  handleSubmit()
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>

            <View className="flex-1 flex-row space-x-24 right-4">
              <TouchableOpacity
                className="h-12"
                onPress={() => {
                  setError(false);
                  navigation.navigate("Signup")}}
              >
                <Text
                  style={{ fontFamily: "Poppins" }}
                  className="text-md underline text-teal-500"
                >
                  Sign up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="h-12"
                onPress={() => {
                  setError(false);
                  navigation.navigate("Forget")}}
              >
                <Text
                  style={{ fontFamily: "Poppins" }}
                  className="text-md underline text-teal-500"
                >
                  Forget password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
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
    color: "black",
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

export default Login;
