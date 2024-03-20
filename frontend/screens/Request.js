import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Map from "./Map";
import Calender from "./Calendar";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";

const Request = ({ navigation, route }) => {

  const [selected, setSelected] = useState("");
  const [region, setRegion] = useState({});
  const [mark, setMark] = useState(false);
  const [loading, setLoading] = useState(false);
  const { packid, name } = route.params

  const onRegionChange = (regions) => {
    const localisation = {
      latitude: regions.nativeEvent.coordinate.latitude,
      longitude: regions.nativeEvent.coordinate.longitude,
    };
    if (!mark) {
      setRegion(localisation);
    }
  };

  const handleOnLongPress = (marker) => {
    console.log(marker.nativeEvent.coordinate);
    const localisation = {
      latitude: marker.nativeEvent.coordinate.latitude,
      longitude: marker.nativeEvent.coordinate.longitude,
    };
    setRegion(localisation);
    setMark(true);
  };

  const handleSumbit = async () => {
    if (!selected) {
      alert("Please select a date");
    } else if (!region.latitude) {
      alert("Please place the pin first");
    } else {
      try {
        setLoading(true);
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        const token = JSON.parse(await AsyncStorage.getItem("token"))
        const localData = {
          latitude: region.latitude,
          longitude: region.longitude,
        };
        const data = { start: selected, pack_id: packid, client_id: user.id };
        await axios.put(`${ip}:3000/client/update/${user.id}`,localData, {
          headers: {
            'authorization': token
          }});
        await axios.post(`${ip}:3000/request/postrequest`, data, {
          headers: {
            'authorization': token
          }});
        ToastAndroid.show('Request sent successfully!', ToastAndroid.BOTTOM);
        navigation.navigate("Home");
      } catch (err) {
        setLoading(false);
        console.error(err);
        navigation.replace("Login")
      }
    }
  };

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const token = JSON.parse(await AsyncStorage.getItem("token"))
      console.log(token);
      axios(`${ip}:3000/client/profile/${user.id}`, {
        headers: {
          'authorization': token
        }})
        .then((result) => {
          console.log(result.headers);
          if (result.data.longitude && result.data.latitude) {
            setRegion({
              latitude: parseFloat(result.data.latitude),
              longitude: parseFloat(result.data.longitude),
            });
            setMark(true);
          }
        })
        .catch((err) => {
          console.error(err);
          navigation.replace("Login")
        });
    })()
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-xl text-blue-800 text-center my-2"
          >
            Choose a date:
          </Text>

          <Calender selected={selected} setSelected={setSelected} />
          <Text
            style={{ fontFamily: "Poppins-Regular" }}
            className="text-xl text-blue-800 text-center mt-2 my-2"
          >
            Choose a location:
          </Text>
          <Map
            onRegionChange={onRegionChange}
            handleOnLongPress={handleOnLongPress}
            setMark={setMark}
            mark={mark}
            region={region}
          />

          <View className="items-center mt-9">
            <View className=" shadow-2xl p-3 bg-blue-400 flex-1 w-72 rounded-2xl shadow-slate-500">
              <View className="flex-1 flex-col items-center">
                <Text className="text-lg" style={{ fontFamily: "Poppins" }}>
                  Your pack:
                </Text>
                <Text
                  className="text-xl text-white"
                  style={{ fontFamily: "Poppins" }}
                >
                  {name}
                </Text>
                <Text className="text-lg" style={{ fontFamily: "Poppins" }}>
                  Your date:
                </Text>
                <Text
                  className="text-xl text-white"
                  style={{ fontFamily: "Poppins" }}
                >
                  {selected || "No Date Selected"}
                </Text>
              </View>
              <View className="flex-1 flex-col items-center mt-2">
                <Text className="text-lg" style={{ fontFamily: "Poppins" }}>
                  Your location:
                </Text>
                <Text
                  className="text-xl text-white"
                  style={{ fontFamily: "Poppins" }}
                >
                  {`${region.latitude}, ${region.longitude}` || "No Location Selected"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className=" bg-blue-800 rounded-xl shadow-xl p-2 w-44 items-center my-6 shadow-slate-700"
              activeOpacity={0.6}
              onPress={handleSumbit}
            >
              <Text
                className="text-xl text-yellow-50"
                style={{ fontFamily: "Poppins" }}
              >
                C o n f i r m
              </Text>
              <Ionicons name="checkmark-done-sharp" size={24} color={"white"} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 50, backgroundColor: "#EFFFFD" }}></View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#EFFFFD",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
});

export default Request;