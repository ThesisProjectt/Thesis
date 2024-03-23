import Avatar from '../Avatar';
import { Ionicons } from "@expo/vector-icons";

export default Packs = {
  headerShown: true,
  headerTitleAlign: "center",
  // headerLeft: () => (
  //   <Ionicons
  //   // onPress={()=> navigation.goBack()}
  //     name="arrow-back-circle-outline"
  //     size={40}
  //     color={"gray"}
  //     style={{ marginLeft: 20 }}
  //   />
  // ),
    headerRight: (props) => <Avatar {...props} />,
    // headerTransparent: true,
    headerStyle: {
      backgroundColor: "#EFFFFD",
      height: 100,
      elevation: 0,
    },
    headerTitleStyle: {
      fontFamily:'Poppins',
    },
    headerTintColor: "gray",
  }