import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";

const CreatePack = ({ navigation, route }) => {
  const { selected, services, total, catid } = route.params;
  const [loading, setLoading] = useState(false);
  const [service, setservice] = useState([]);

  useEffect(() => {
    const filteredServices = services.filter((ele) =>
      selected.includes(ele.id)
    );
    setservice(filteredServices);
  }, []);

  const purchase = async () => {
    setLoading(true);
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const token = JSON.parse(await AsyncStorage.getItem("token"));
    const data = {
      name: "Custom Pack",
      status: "ClientPack",
      client_id: user.id,
      varying_price: total,
    };
    axios.post(`${ip}:3000/pack/addPack`, data, {
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        selected.map(async (item) => {
          let packServiceData = {
            pack_id: result.data.id,
            service_id: item,
            total: total,
          };
          axios.post(`${ip}:3000/packhasservice/addAPack`, packServiceData);
        });
        navigation.navigate("Request", {
          packid: result.data.id,
          name: "Custom Pack",
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="h-36" style={styles.flatContainer2}>
            <View
              style={{
                margin: 3,
                backgroundColor: "white",
                width: "98%",
                borderRadius: 20,
                height: 127,
                paddingHorizontal: 20,
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Text
                style={{ fontFamily: "Poppins" }}
                className="text-3xl text-blue-500 "
              >
                Custom Pack
              </Text>
              <Text
                style={{ fontFamily: "Poppins" }}
                className=" text-xl text-blue-500"
              >
                Total: {total}$
              </Text>
            </View>
            <View className="p-6">
              {service.map((ele, index) => {
                return (
                  <View className="p-1 flex-row" key={index}>
                    <Text
                      className="text-white text-xl"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {`\u2022  `}
                    </Text>
                    <Text
                      className="text-white text-xl w-60"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {ele.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 330,
              backgroundColor: "#008BEA",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
              height: 51,
            }}
            onPress={() => purchase()}
          >
            <Text
              className="text-white text-xl"
              style={{ fontFamily: "Poppins" }}
            >
              Purchase
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="justify-center rounded-2xl items-center mt-2"
            activeOpacity={0.8}
            style={{
              width: 330,
              backgroundColor: "#B21212",
              height: 51,
            }}
            onPress={() => navigation.navigate("Custom", { catid: catid })}
          >
            <Text
              className="text-white text-xl"
              style={{ fontFamily: "Poppins" }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#EFFFFD",
    alignItems: "center",
  },
  flatContainer: {
    width: 330,
    height: "85%",
    borderRadius: 20,
    backgroundColor: "#008BEA",
    marginBottom: 20,
  },
  flatContainer2: {
    alignItems: "center",
    width: 330,
    height: "80%",
    borderRadius: 20,
    backgroundColor: "#008BEA",
    marginBottom: 20,
  },
});

export default CreatePack;
