import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import { Notifications } from "react-native-notifications";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => { 
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      await axios(`${ip}:3000/notification/getall/${user.id}`)
        .then((result) => {
          setNotification(result.data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const handleDelete = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    await axios.delete(`${ip}:3000/notification/delete/${user.id}`)
    .then(() => {
      setNotification([]);
    })
    .catch((err)=>{
        console.error(err);
    })
  };

  return (
    <View style={styles.container}>
      <View className="items-end right-4 mb-2">
        <TouchableOpacity onPress={()=>handleDelete()} className="flex-row gap-1" activeOpacity={0.4}>
          <Ionicons name="remove-circle-outline" size={20} color={"gray"} />
          <Text
            className="text-gray-500"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notification}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className="w-80 h-20 rounded-xl self-center my-2 justify-between items-center pl-3 shadow-lg shadow-slate-600 flex-row"
            style={{ backgroundColor: "#F4F4F4" }}
          >
            <Ionicons name="notifications-outline" size={40} color="#61D8D8" />
            <View className="flex-1 flex-col mx-3">
              <Text style={styles.text} className=" text-sm">
                {item.message}
              </Text>
              <TouchableOpacity activeOpacity={0.4}>
                <Text style={{ fontFamily: "Poppins", color: "#02337B" }}>
                  See details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFFFFD",
    paddingTop: StatusBar.currentHeight,
    //   paddingHorizontal: 15,
    height: Dimensions.get("screen").height - StatusBar.currentHeight,
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "#02337B",
  },
});
