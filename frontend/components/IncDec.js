import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const IncDecCounter = ({ setTotal, price }) => {

  const [num, setNum] = useState(1);
  const incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    //   setTotal(prev => prev + price)
    }
  };
  const decNum = () => {
    if (num >= 1) {
      setNum(num - 1);
    //   setTotal(prev => prev - price)
    }
  };
  const handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={decNum} ><Ionicons name="remove-circle-outline" size={22} color={"gray"}/></TouchableOpacity>
      <TextInput readOnly style={{textAlign:"center", color:"black"}} value={num.toString()} onChange={handleChange} />
      <TouchableOpacity style={styles.btn} title="+" onPress={incNum} ><Ionicons name="add-circle-outline" size={22} color={"gray"}/></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:"flex-end"
    },
    btn: {
        alignSelf: 'center',
    }
})

export default IncDecCounter;
