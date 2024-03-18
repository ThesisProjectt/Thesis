import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import LOGO from "../assets/LOGO Cleaning.png";
import background from "../assets/sign up.png";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Loading from "../components/Loading";

const Signup = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    const pattern = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
    if(name === ""){
      setError("Please enter your name.")
      return false;
    }else if (!pattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    } else if (password.length < 8) {
      setError("Password must contain at least 8 characters");
      return false;
    } else if (!/\d/.test(password)) {
      setError("Your password must contain a number");
      return false;
    } else if (!/[A-Z]/.test(password)) {
      setError("Your password must contain one uppercase");
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

  const createAccount = async () => {
    try {
      const isValidated = validate();
      const data = {
        fullName: name,
        email: email,
        password: password,
      };
      if (isValidated) {
        setLoading(true)
        await axios.post("http://192.168.11.126:3000/client/signup", data)
        console.log('done')
        navigation.replace("Login")
      }
    } catch (e) {
      setLoading(false)
      setError("This email has already been used.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading
      ?
        <Loading/>
      :
      <KeyboardAwareScrollView canCancelContentTouches={false} keyboardShouldPersistTaps="never">
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
              Sign up
            </Text>
          </View>
          <View className="flex-1 items-center h-screen w-96 p-6 rounded-xl left-4 top-4 gap-8">
            {error && <Text style={styles.inputError}>{error}</Text>}
            <TextInput
              required
              placeholder="Full name"
              className="rounded-2xl shadow-lg bg-white"
              style={styles.input}
              onChangeText={(text) => setName(text)}
            />
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
            <View
              className="rounded-2xl shadow-lg bg-white"
              style={styles.input}
            >
              <TextInput
                required
                placeholder="Confirm Password"
                secureTextEntry={visible2}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity
                onPress={() => setVisible2(!visible2)}
                style={{ position: "absolute", right: 12 }}
              >
                {visible2 ? (
                  <Ionicons name="eye-off" size={24} color={"black"} />
                ) : (
                  <Ionicons name="eye" size={24} color={"black"} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              className="rounded-2xl shadow-lg"
              style={styles.button}
              onPress={() => {
                createAccount();
              }}
            >
              <Text
                style={{ fontFamily: "Poppins" }}
                className="text-cyan-50 text-xl"
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <View className="flex-1 flex-row right-4">
            <Text style={{ fontFamily: 'Poppins' }} className="text-md text-teal-500">Already have an account,{" "}</Text>
            <TouchableOpacity
              className="h-12"
              onPress={() => {
                navigation.navigate("Login")}}
            >
              <Text style={{ fontFamily: 'Poppins' }} className="text-md underline text-teal-500">Sign in</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ImageBackground>
        
      </KeyboardAwareScrollView>
      }
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
    fontFamily:"Poppins",
    fontSize: 13,
    position:'absolute'
  },
});

export default Signup;
