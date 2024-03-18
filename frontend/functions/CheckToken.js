import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function CheckToken () {
    const isToken = await AsyncStorage.getItem("token")
    return isToken
}