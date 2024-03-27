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
} from "react-native";
// import notifee from '@notifee/react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";

export default function Notification({ navigation }) {
    
  const [notification, setNotification] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [id, setId] = useState(null);

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
    await axios
      .delete(`${ip}:3000/notification/delete/${user.id}`)
      .then(() => {
        setNotification([]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

//   async function onDisplayNotification() {
//     if (Platform.OS === "ios") {
//       await notifee.requestPermission();
//     }
//     // Create a channel (required for Android)
//     const channelId = await notifee.createChannel({
//       id: "default",
//       name: "Default Channel",
//     });

//     // Display a notification
//     await notifee.displayNotification({
//       title: "SPOTLESS",
//       body: "Main body content of the notification",
//       android: {
//         channelId,
//         smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
//         // pressAction is needed if you want the notification to open the app when pressed
//         pressAction: {
//           id: "default",
//         },
//       },
//     });
//   }

  const pay = async (id) => {
    await axios(`${ip}:3000/pack/fetchpack/${id}`)
      .then(async (result) => {
        let amount = result.data.varying_price;
        await axios.post(`${ip}:3000/api/payment`, { amount: amount })
          .then((res) => {
            const { result } = res.data;
            Linking.openURL(result.result.link);
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
            className="w-80 h-fit py-4 rounded-xl self-center my-2 justify-between items-center pl-3 shadow-lg shadow-slate-600 flex-row"
            style={{ backgroundColor: "#F4F4F4" }}
          >
            {item.status === "denied" ? (
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
                  ) : (
                    <Button
                      onPress={() =>
                        navigation.navigate("Request", {
                          packid: item.pack_id,
                          name: item.name,
                        })
                      }
                      title="change date"
                      color={"#B21212"}
                    />
                  )}
                </View>
              )}
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
