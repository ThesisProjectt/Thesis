import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
  Linking,
  Button,
  LayoutAnimation,
  RefreshControl,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";
import * as WebBrowser from 'expo-web-browser';
import { io } from 'socket.io-client';

export default function Notification({ navigation }) {

  const [notif, setNotif] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [id, setId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const socket = io("ws://192.168.1.55:8000")

  // socket.onAny((event) => { 
  //   console.log("Socket Event: " + event);
  // })
  // socket.close()
  
  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      await axios(`${ip}:3000/notification/getall/${user.id}`)
        .then((result) => {
          setNotif(result.data);
          setRefresh(false);
          setExpanded(false);
        })
        .catch((err) => console.log(err));
    })();
  }, [refresh]);

  const handleDelete = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    await axios
      .delete(`${ip}:3000/notification/delete/${user.id}`)
      .then(() => {
        setNotif([]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const pay = async (id) => {
    await axios(`${ip}:3000/pack/fetchpack/${id}`)
      .then(async (result) => {
        let amount = result.data.varying_price;
        await axios.post(`${ip}:3000/api/payment`, { amount: amount })
        .then(async (res) => {
          const { result, path, payload } = res.data;
          await WebBrowser.openBrowserAsync(result.result.link);
        })
        .catch((error) => {
          console.log(error, "error");
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <View className="items-end right-4 mb-2">
        <TouchableOpacity
          onPress={handleDelete}
          className="flex-row gap-1"
          activeOpacity={0.4}
        >
          <MaterialIcons name="clear" size={20} color={"gray"} />
          <Text
            className="text-gray-500"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notif}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            className="w-80 h-fit py-4 rounded-xl self-center my-2 justify-between items-center pl-3 shadow-lg shadow-slate-600 flex-row"
            style={{ backgroundColor: "#F4F4F4" }}
          >
            {item.status === "denied" && item.status !== "feedback" ? (
              <Ionicons
                name="notifications-outline"
                size={40}
                color="#B21212"
              />
            ) : (
              <Ionicons
                name="notifications-outline"
                size={40}
                color="#61D8D8"
              />
            )}

            <View className="flex-1 flex-col mx-3">
              <Text style={styles.text} className=" text-sm">
                {item.message}
              </Text>
              <TouchableOpacity
                className="flex-row space-x-2"
                activeOpacity={0.4}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                  setExpanded(!expanded);
                  setId(item.id);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins",
                    color: "#02337B",
                    paddingLeft: 5,
                  }}
                  className="text-base"
                >
                  See details
                </Text>
                {expanded && item.id == id ? (
                  <MaterialIcons name="expand-less" size={22} color={"gray"} />
                ) : (
                  <MaterialIcons name="expand-more" size={22} color={"gray"} />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#02337B",
                }}
                className="self-end text-xs"
              >
                {item.createdAt.split(["T"])[0]}
              </Text>
              {expanded && item.id == id && (
                <View className="pt-2 transition-opacity">
                  {item.status === "accepted" ? (
                    <Button
                      onPress={() => pay(item.pack_id)}
                      title="continue to purchase"
                      color={"#61D8D8"}
                    />
                  ) : item.status === "denied" ? (
                    <Button
                      onPress={() =>
                        navigation.navigate("Request", {
                          packid: item.pack_id,
                          name: 'Client Pack',
                        })
                      }
                      title="choose another date"
                      color={"#B21212"}
                    />
                  ) : (
                    <Button
                      onPress={() => navigation.navigate("Feedback")}
                      title="give feedback"
                      color={"#61D8D8"}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        )}
      />
      <View className="h-32"></View>
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