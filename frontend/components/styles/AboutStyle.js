import Avatar from '../Avatar';
import { Ionicons } from "@expo/vector-icons";

export default About = {
  headerShown: true,
  headerTitleAlign: "center",
    headerRight: (props) => <Avatar {...props} />,
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