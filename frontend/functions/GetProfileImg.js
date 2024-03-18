import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function GetProfileImg () {
  const user = JSON.parse(await AsyncStorage.getItem("user"));
  try {
    await axios(`http://192.168.11.126:3000/client/getimg/${user.id}`)
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