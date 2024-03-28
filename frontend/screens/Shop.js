import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native'
import React from 'react'

const Shop = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} className="text-2xl">Comming Soon!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#EFFFFD",
      paddingTop: StatusBar.currentHeight,
      flex:1,
      justifyContent:"center",
      alignItems:'center',
      height: Dimensions.get("screen").height - StatusBar.currentHeight,
    },
    text: {
      fontFamily: "Poppins",
      fontWeight: "400",
      color: "#02337B",
    },
  });

export default Shop