import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const Map = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mode, setMode] = useState("standard");
  const [current, setCurrent] = useState(1);
  const mapRef = useRef();

  const initial_Region = {
    latitude: 36.894404976046154,
    longitude: 10.1868000326626,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  const focusMap = () => {
    const initial = {
      latitude: props.region.latitude,
      longitude: props.region.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };
    mapRef?.current?.animateCamera(
      { center: initial, zoom: 15 },
      { duration: 3000 }
    );
  };

  const handleMapMode = () => {
    const change = ["standard", "satellite", "terrain", "hybrid"];
    setCurrent(current + 1);
    setMode(change[current]);
    if (current === 3) {
      setCurrent(0);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        initialRegion={initial_Region}
        // region={initial_Region}
        onLongPress={props.handleOnLongPress}
        onPress={() => props.setMark(false)}
        mapType={mode}
        zoomControlEnabled
        onUserLocationChange={props.onRegionChange}
      >
        {props.mark ? (
          <Marker
            coordinate={{
              latitude: props.region.latitude,
              longitude: props.region.longitude,
            }}
            draggable
            onDragEnd={props.handleOnLongPress}
          >
            <Ionicons name="location" size={30} color={"red"} />
          </Marker>
        ) : null}
      </MapView>
      <TouchableOpacity
        onPress={() => handleMapMode()}
        className="absolute top-16 right-3 opacity-80 rounded-sm bg-slate-200 p-1"
      >
        <Ionicons name="map-outline" color={"gray"} size={28} />
      </TouchableOpacity>
      {props.mark ? (
        <TouchableOpacity
          className="absolute top-3 left-3 opacity-80 rounded-sm bg-slate-200 p-1"
          onPressOut={() => focusMap()}
        >
          <Ionicons name="location-sharp" color={"red"} size={24} />
        </TouchableOpacity>
      ) : null}
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
  mapContainer: {
    flex: 1,
  },
  map: {
    // ...StyleSheet.absoluteFill,
    height: 450,
    width: "100%",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 126,
    height: 126,
    borderRadius: 20,
    elevation: 4,
  },
});

export default Map;
