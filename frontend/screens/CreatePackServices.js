import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ip from "../functions/IpAdress";
import Loading from "../components/Loading";
import Checkbox from "expo-checkbox";
import IncDecCounter from "../components/IncDec";

const CreatePackServices = ({ navigation, route }) => {
  const { catid } = route.params;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios(`${ip}:3000/services/getServicebycategory/${catid}`)
        .then((result) => {
          setServices(result.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error: ", err);
          setLoading(false);
        });
    })();
  }, []);

  const Item = ({ image, name, id, price }) => (
    <View className="flex-row items-center my-1 justify-center">
      <View className="bg-white p-3 items-center justify-center rounded-xl w-11 h-11 shadow-sm ml-1 shadow-black">
        <Image src={image} style={{ width: 33, height: 33 }} />
      </View>
      <View className="bg-white w-8/12 p-2 mx-2 rounded-xl shadow-sm shadow-black flex-row justify-between">
        <Text
          style={{ fontFamily: "Poppins-Regular" }}
          className=" text-blue-800 text-base landscape: w-8/12"
        >
          {name}
        </Text>
        <IncDecCounter price={price} setTotal={setTotal}/>
      </View>
      <View className="bg-white p-3 rounded-xl shadow-sm shadow-black">
        <Checkbox
          color={"#02337B"}
          onValueChange={() => handleSelectItem(id, price)}
          value={handleValue(id)}
        />
      </View>
    </View>
  );

  const handleSelectItem = (id, price) => {
    if (selectedItems.includes(id)) {
      setTotal((prev) => prev - price);
      selectedItems.splice(selectedItems.indexOf(id), 1);
    } else {
      setTotal((prev) => prev + price);
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleValue = (id) => {
    if (selectedItems.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View className=" gap-7">
          <View className=" flex-col gap-2" style={styles.flatContainer2}>
            <Text
              className="text-xl pl-5 pb-3 text-blue-800"
              style={{ fontFamily: "Poppins" }}
            >
              Select your cleaning needs
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={services}
              renderItem={({ item }) => (
                <Item
                  image={item.image}
                  name={item.name}
                  id={item.id}
                  price={item.price}
                />
              )}
              keyExtractor={(item) => item.id}
            />
            <View className="self-center">
              <View
                style={{ width: "95%" }}
                className="text-blue-800 text-base flex-row justify-between bg-white p-2 rounded-xl shadow-sm shadow-black"
              >
                <Text
                  style={{ fontFamily: "Poppins" }}
                  className="text-blue-800 text-base"
                >
                  Total:
                </Text>
                <Text
                  style={{ fontFamily: "Poppins" }}
                  className="text-blue-800 text-base"
                >
                  {total} $
                </Text>
              </View>
            </View>
          </View>
          <View className="items-center flex-1 justify-end mb-5 gap-2">
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
              onPress={() => {
                navigation.navigate("Custom Pack", {
                  selected: selectedItems,
                  services: services,
                  total: total,
                  catid: catid,
                });
              }}
            >
              <Text
                className="text-white text-xl"
                style={{ fontFamily: "Poppins" }}
              >
                Create Your Pack
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: 330,
                backgroundColor: "#B21212",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 16,
                height: 51,
              }}
              onPress={() => navigation.navigate("Packs", { catid: catid })}
            >
              <Text
                className="text-white text-xl"
                style={{ fontFamily: "Poppins" }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
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
    width: Dimensions.get("window").width,
  },
  flatContainer2: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width,
    maxHeight: 550,
    marginBottom: 20,
  },
});

export default CreatePackServices;
