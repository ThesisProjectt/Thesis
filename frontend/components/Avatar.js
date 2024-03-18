import { Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Avatar() {

  const [image, setImage] = useState("");

  useEffect(()=>{
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      try {
        await axios(`http://192.168.11.126:3000/client/getimg/${user.id}`)
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
  await AsyncStorage.clear()
}
