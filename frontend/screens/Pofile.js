import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../functions/IpAdress";


const ProfilePage = ({navigation}) => {
  const [editImage, setEditImage] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("rbk");
  const [email, setEmail] = useState("rbk@example.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [password, setPassword] = useState("********");
  const [profileImage, setProfileImage] = useState("");
  const [r,setR]=useState(true)
  const [id,setId]=useState(1)
  const fecthdata=async()=>{
    try{
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setId(user.id)
      let res= await axios.get(`${ip}:3000/client/oneclient/${user.id}`)
      console.log(res.data[0]);
      setUserData(res.data[0])
      setProfileImage(res.data[0].image)
      setName(res.data[0].fullName)
      setEmail(res.data[0].email)
      setPhone(res.data[0].phone)
      setPassword(res.data[0].password)
      
    }catch(err){console.log(err)}
  }
  const updateuser= async()=>{
    try{
      const obj={
        fullName: name,
        email: email,
        phone: phone,
        password: password,
        image: profileImage
      }
      res=await axios.put(`${ip}:3000/client/updateclient/${id}`,obj)
      setR(!r)
      alert("Update Successful!")
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('we need camera roll permissions to make this work');
      }
    })();
    
    fecthdata()
  }, [!r]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
    console.log(result.assets[0].uri);
    try{
      const obj={
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        image: result.assets[0].uri
      }
      res=await axios.put(`${ip}:3000/client/updateclient/${id}`,obj)
      setR(!r)
      alert("image updated  Successful!")
    }catch(err){
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
    <View style={styles.bgimg} className="flex w-full h-48 rounded-b-3xl">
    <View  className=" items-center relative top-28 mb-5">
        <View style={styles.img} className="relative p-2 rounded-full">
          <Image
            source={{ uri:userData.image}}
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
              className=" flex items-end mb-5 px-10 py-3 rounded-md "
            >
              <Text style={styles.textc} className="font-bold">
                {editDetails ? "Cancel" : "Edit Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className=" font-bold mb-1">Name:</Text>
        {editDetails ? (
          <TextInput
            className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
        ) : (
          <Text className=" mb-5">{userData.fullName}</Text>
        )}

        <Text className=" font-bold mb-1">Email:</Text>
        {editDetails ? (
          <TextInput
            className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        ) : (
          <Text className=" mb-5">{userData.email}</Text>
        )}

        <Text className=" font-bold mb-1">Phone:</Text>
        {editDetails ? (
          <TextInput
            className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
          />
        ) : (
          <Text className=" mb-5">{userData.phone}</Text>
        )}

        <Text className=" font-bold mb-1">Password:</Text>
        {editDetails ? (
          <TextInput
            className=" h-10 border border-gray-500 rounded-md px-3 mb-3"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
          
        ) : (
          <Text className=" mb-5">***********</Text>
        )}
        {editDetails ? (
          <Button style={styles.textc}
          onPress={() => {updateuser(),updateDetails()}}
          title="save"
          color="#265073"
        />
        ) : null }
        
      </View>
      <View className="items-center justify-end">
      <TouchableOpacity
            className="justify-center rounded-2xl items-center mt-2"
            activeOpacity={0.8}
            style={{
              width: 330,
              backgroundColor: "#B21212",
              height: 51,
            }}
            onPress={async() => {
              await AsyncStorage.clear()
              navigation.replace("Login")}}
          >
            <Text
              className="text-white text-xl"
              style={{ fontFamily: "Poppins" }}
            >
              Log out
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};
const styles=StyleSheet.create({
  bgimg:{
    backgroundColor:'#2D9596'
  },
  cont:{
    backgroundColor: "#EFFFFD",
  },
  img:{
    backgroundColor: "#EFFFFD",
  },
  btn:{
    backgroundColor:"#265073",
  },
  textc:{
    color:'#ffffff'
  }

})

export default ProfilePage;
