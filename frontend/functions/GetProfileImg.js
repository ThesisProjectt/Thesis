import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "./IpAdress";

export default async function GetProfileImg () {
  const user = JSON.parse(await AsyncStorage.getItem("user"));
  try {
    await axios(`${ip}:3000/client/getimg/${user.id}`)
    .then(
     (res) => {
        console.log(res.data);
        return JSON.stringify(res.data);
      }
    );
  } catch (err) {
    return null;
  }
};