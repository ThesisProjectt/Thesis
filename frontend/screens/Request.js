import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
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
  const [place, setPlace] = useState("");
  const { packid, name } = route.params;

  const getPlace = async (region) => {
    try {
      axios(
        `https://geocode.maps.co/reverse?lat=${region.latitude}&lon=${region.longitude}&api_key=65fe2c523a04e045323131pzk527ffc`
      ).then((result) => {
        console.log(result.data.address, "place");
        setPlace(
          // result.data.address.state+" ,"+result.data.address.state_district ||
          result.data.address.county+" ,"+result.data.address.state ||
          result.data.address.residential ||
          result.data.address.village ||
          result.data.address.suburb ||
          result.data.address.state
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onRegionChange = (regions) => {
    const localisation = {
      latitude: regions.nativeEvent.coordinate.latitude,
      longitude: regions.nativeEvent.coordinate.longitude,
    };
    if (!mark) {
      setRegion(localisation);
      getPlace(localisation);
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
    getPlace(localisation);
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
        const token = JSON.parse(await AsyncStorage.getItem("token"));
        const localData = {
          latitude: region.latitude,
          longitude: region.longitude,
        };
        const data = { start: selected, pack_id: packid, client_id: user.id };
        await axios.put(`${ip}:3000/client/update/${user.id}`, localData, {
          headers: {
            authorization: token,
          },
        });
        await axios.post(`${ip}:3000/request/postrequest`, data, {
          headers: {
            authorization: token,
          },
        });
        ToastAndroid.show("Request sent successfully!", ToastAndroid.BOTTOM);
        navigation.navigate("Home");
      } catch (err) {
        setLoading(false);
        console.error(err);
        navigation.replace("Login");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      console.log(token);
      axios(`${ip}:3000/client/profile/${user.id}`, {
        headers: {
          authorization: token,
        },
      })
        .then((result) => {
          const localisation = {
            latitude: result.data.latitude,
            longitude: result.data.longitude,
          };
          if (result.data.longitude && result.data.latitude) {
            setRegion({
              latitude: parseFloat(result.data.latitude),
              longitude: parseFloat(result.data.longitude),
            });
            setMark(true);
            getPlace(localisation);
          }
        })
        .catch((err) => {
          console.error(err);
          navigation.replace("Login");
        });
    })();
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
            <View className=" shadow-2xl p-6 bg-blue-400 flex-1 w-full h-52 rounded-2xl shadow-gray-500">
              <View className="flex-1 flex-col">
                <Text
                  className="text-md text-gray-700"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  Your pack
                </Text>
                <Text
                  className="text-xl text-gray-900 pl-2"
                  style={{ fontFamily: "Poppins" }}
                >
                  {name}
                </Text>
                <Text
                  className="text-md text-gray-700 mt-3"
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  Your date
                </Text>
                <Text
                  className="text-xl text-gray-900 pl-2"
                  style={{ fontFamily: "Poppins" }}
                >
                  {selected || "No Date Selected"}
                </Text>
              </View>
              <View className="flex-1 flex-col items-center w-32 mt-2 absolute right-3 bottom-3 bg-blue-600 shadow-lg shadow-slate-600 rounded-lg p-1">
                <Ionicons name="locate-outline" size={32} color="#fff" />
                <Text
                  className="text-xs text-white"
                  style={{ fontFamily: "Poppins" }}
                >
                  {`${place}` || "No Location Selected"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className=" bg-blue-800 rounded-xl shadow-xl p-2 w-60 items-center my-6 shadow-slate-700"
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
    flex: 1,
    backgroundColor: "#EFFFFD",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
});

export default Request;
