import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import ip from "../functions/IpAdress";
import { SafeAreaView } from "react-native-safe-area-context";
export const Slider_Width = Dimensions.get("window").width;
export const Item_Width = Math.round(Slider_Width * 0.85);

export default Packs = ({ navigation, route }) => {
  const { catid, catName } = route.params;
  const [loading, setLoading] = useState(false);
  const [packs, setPacks] = useState([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState();
  const isCarousel = useRef(null);
console.log(Dimensions.get("window").width)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${ip}:3000/pack/get/${catid}`);
        const data = await response.json();
        const filteredData = data.filter(
          (pack) => pack.status !== "ClientPack"
        );
        setPacks(filteredData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("error fetching error", error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView className="h-full">
          <Carousel
            ref={isCarousel}
            data={packs}
            sliderWidth={Slider_Width}
            itemWidth={Item_Width}
            onSnaptoItem={(index) => setIndex(index)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={styles.flatContainer}>
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
                        {item.name}
                      </Text>
                      <Text
                        style={{ fontFamily: "Poppins" }}
                        className=" text-xl text-blue-500"
                      >
                        Total:{" "}
                        {item?.Services.reduce(
                          (total, element) => total + element.price,
                          0
                        )}
                        $
                      </Text>
                    </View>
                    <View className="p-6">
                      {item.Services.map((ele, index) => {
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
                              {`${ele.name}`}
                            </Text>
                            {/* <Text
                            className="text-white text-lg font-bold"
                            style={{ fontFamily: "Poppins" }}
                          >
                            {ele.PackHasServices.quantity == null
                              ? ""
                              : `\u2022 ${ele.PackHasServices.quantity}`}
                          </Text> */}
                          </View>
                        );
                      })}
                    </View>
                  </View>

                  <TouchableOpacity
                    className="justify-center items-center"
                    activeOpacity={0.8}
                    style={{
                      width: Dimensions.get("window").width > 400 ? 380 : 330,
                      backgroundColor: "#008BEA",
                      borderRadius: 16,
                      height: 51,
                    }}
                    onPress={() => {
                      navigation.navigate("Request", {
                        packid: item.id,
                        name: item.name,
                      });
                    }}
                  >
                    <Text
                      className="text-white text-xl"
                      style={{ fontFamily: "Poppins" }}
                    >
                      Purchase
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <TouchableOpacity
            className="bg-blue-700 justify-center self-center items-center"
            activeOpacity={0.8}
            style={{
              width: Dimensions.get("window").width > 400 ? 380 : 330,
              borderRadius: 16,
              height: 51,
              // marginTop: 10,
              marginBottom: 20,
            }}
            onPress={() => {
              navigation.navigate("Custom", {
                catid: catid,
              });
            }}
          >
            <Text
              className="text-white text-xl"
              style={{ fontFamily: "Poppins" }}
            >
              Create Custom
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "#EFFFFD",
    alignItems: "center",
  },
  flatContainer: {
    width: Dimensions.get("window").width > 400 ? 380 : 330,
    // width: 330,
    height: "87%",
    borderRadius: 20,
    backgroundColor: "#008BEA",
    marginBottom: 20,
  },
});
