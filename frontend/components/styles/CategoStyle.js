import Avatar from "../Avatar";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Image } from 'react-native';
import logo from "../../assets/LOGO Cleaning.png"

export default Catego = {
  headerShown: true,
  headerTitleAlign: "center",
  headerLeft: () => (
    <Image
      source={ logo }
      style={{ width:40, height:40, marginLeft: 20}}
    />
  ),
  headerRight: (props) => <Avatar {...props} />,
    headerStyle: {
        backgroundColor: "#EFFFFD",
        height: 100,
        elevation: 0,
      },
  headerTitleStyle: {
    fontFamily: "Poppins",
  },
  headerTintColor: "gray",
  tabBarLabel: "",
  tabBarIcon: ({ color }) => (
    <AntDesign
      name="appstore-o"
      color={color}
      size={30}
      style={{ marginTop: 5 }}
    />
  ),
};
