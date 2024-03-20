import { Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import ip from "../functions/IpAdress";

export default function Avatar() {

  const [image, setImage] = useState("");

  useEffect(()=>{
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const token = JSON.parse(await AsyncStorage.getItem("token"))
      try {
        await axios(`${ip}:3000/client/getimg/${user.id}`, {
          headers: {
            'authorization': token
          }})
        .then((res) => {
            setImage(res.data)
          })
          .catch((err)=>console.error(err))
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  return (
    <TouchableOpacity onPress={() => handleProfile()}>
      <Image
        style={{ width: 45, height: 45, marginRight: 20, borderRadius: 30 }}
        source={image ? {uri: image} : require("../assets/human.png")} 
      />
    </TouchableOpacity>
  );
}

const handleProfile = async () => {
  
}
