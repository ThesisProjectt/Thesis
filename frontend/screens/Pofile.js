import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../functions/IpAdress";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Avatar from "../components/Avatar";

const ProfilePage = ({ navigation }) => {
  const [editImage, setEditImage] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("rbk");
  const [email, setEmail] = useState("rbk@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [password, setPassword] = useState("********");
  const [profileImage, setProfileImage] = useState("");
  const [CIN, setCIN] = useState(12345678);
  const [r, setR] = useState(true);
  const [id, setId] = useState(1);
  const [message, setMessage] = useState("");

  const fecthdata = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setId(user.id);
      setMessage(user.message);
      let res = await axios.get(`${ip}:3000/client/oneclient/${user.id}`);
      console.log(res.data[0]);
      setUserData(res.data[0]);
      setProfileImage(res.data[0].image);
      setName(res.data[0].fullName);
      setEmail(res.data[0].email);
      setPhone(res.data[0].phone);
      setCIN(res.data[0].CIN);
      setPassword(res.data[0].password);
    } catch (err) {
      console.log(err);
    }
  };
  const updateuser = async () => {
    try {
      const obj = {
        fullName: name,
        email: email,
        phone: phone,
        password: password,
        image: profileImage,
        CIN: CIN,
      };
      res = await axios.put(`${ip}:3000/client/updateclient/${id}`, obj);
      setR(!r);
      ToastAndroid.show("Profile updated successfully!", ToastAndroid.BOTTOM);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("we need camera roll permissions to make this work");
      }
    })();

    fecthdata();
  }, [!r]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      try {
        const obj = {
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          CIN: userData.CIN,
          image: result.assets[0].uri,
        };
        res = await axios.put(`${ip}:3000/client/updateclient/${id}`, obj);
        setR(!r);
        ToastAndroid.show("image updated successfully!", ToastAndroid.BOTTOM);
        AsyncStorage.setItem("refresh", JSON.stringify(r));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateImage = () => {
    setEditImage(!editImage);
    if (!editImage) {
      pickImage();
    }
  };

  const updateDetails = () => {
    setEditDetails(!editDetails);
  };

  return (
    <View style={styles.cont} className="container  flex h-full">
      <KeyboardAwareScrollView>
        <View style={styles.bgimg} className="flex w-full h-48 rounded-b-3xl">
          <Text
            className="self-center absolute top-14 text-2xl text-slate-100"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {message}
          </Text>
          <View className=" items-center relative top-28 mb-5">
            <View style={styles.img} className="relative p-2 rounded-full">
              <Image
                source={{ uri: userData.image }}
                className="w-36 h-36 rounded-full bg-blue-500"
              />
              <TouchableOpacity
                onPress={updateImage}
                className="absolute right-1 bottom-1 bg-blue-50 p-2 rounded-full"
              >
                <FontAwesome name="edit" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className=" mt-16 p-5 w-full">
          <View className="flex items-end w-full">
            <View className="max-w-full">
              <TouchableOpacity
                style={styles.btn}
                onPress={updateDetails}
                className=" flex items-end mb-5 px-8 py-2 rounded-md "
              >
                <Text style={styles.textc} className="text-md">
                  {editDetails ? "Cancel" : "Edit Profile"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ fontFamily: "Poppins" }} className=" mb-1">
            Name:
          </Text>
          {editDetails ? (
            <TextInput
              className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
          ) : (
            <Text style={{ fontFamily: "Poppins-Regular" }} className=" left-3 mb-5">
              {userData.fullName}
            </Text>
          )}

          <Text style={{ fontFamily: "Poppins" }} className=" mb-1">
            Email:
          </Text>
          {editDetails ? (
            <TextInput
              className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          ) : (
            <Text style={{ fontFamily: "Poppins-Regular" }} className="left-3 mb-5">
              {userData.email}
            </Text>
          )}

          <Text style={{ fontFamily: "Poppins" }} className="mb-1">
            Phone:
          </Text>
          {editDetails ? (
            <TextInput
              className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone"
            />
          ) : (
            <Text style={{ fontFamily: "Poppins-Regular" }} className="left-3 mb-5">
              {userData.phone}
            </Text>
          )}

          <Text style={{ fontFamily: "Poppins" }} className="mb-1">
            CIN:
          </Text>
          {editDetails ? (
            <TextInput
              className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
              value={CIN?.toString()}
              onChangeText={setCIN}
              placeholder="CIN"
            />
          ) : (
            <Text style={{ fontFamily: "Poppins-Regular" }} className="left-3 mb-5">
              {userData.CIN}
            </Text>
          )}

          <Text style={{ fontFamily: "Poppins" }} className="mb-1">
            Password:
          </Text>
          {editDetails ? (
            <TextInput
              className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
              // value={password}
              onChangeText={setPassword}
              placeholder="New Password"
            />
          ) : (
            <Text className="left-3 mb-5">***********</Text>
          )}
          {editDetails ? (
            <Button
              style={styles.textc}
              onPress={() => {
                updateuser(), updateDetails();
              }}
              title="save"
              color="#265073"
            />
          ) : null}
        </View>

        <View className="items-center justify-end">
          <TouchableOpacity
            className="justify-center rounded-2xl items-center mt-2 flex-row"
            activeOpacity={0.8}
            style={{
              width: 330,
              backgroundColor: "#B21212",
              height: 51,
            }}
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.replace("Login");
            }}
          ><Entypo name="log-out" size={24} color={'white'}/>
            <Text
              className="text-white text-xl ml-3"
              style={{ fontFamily: "Poppins" }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  bgimg: {
    backgroundColor: "#2D9596",
  },
  cont: {
    backgroundColor: "#EFFFFD",
  },
  img: {
    backgroundColor: "#EFFFFD",
  },
  btn: {
    backgroundColor: "#265073",
  },
  textc: {
    color: "#ffffff",
    fontFamily: "Poppins",
  },
});

export default ProfilePage;
