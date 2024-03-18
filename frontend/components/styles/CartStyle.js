import Avatar from "../Avatar";
import { Ionicons } from "@expo/vector-icons";

export default Cart = {
  headerShown: true,
  headerTitleAlign: "center",
  headerLeft: () => (
    <Ionicons
      name="arrow-back-circle-outline"
      size={40}
      color={"gray"}
      style={{ marginLeft: 20 }}
    />
  ),
  headerRight: (props) => <Avatar {...props} />,
    // headerTransparent: true,
    headerStyle: {
        height: 130,
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
    <Ionicons
      name="apps-outline"
      color={color}
      size={30}
      style={{ marginTop: 5 }}
    />
  ),
};
