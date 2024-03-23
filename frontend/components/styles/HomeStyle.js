
import { Image } from 'react-native';
import Avatar from '../Avatar';
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/LOGO Cleaning.png"

export default Home = {
    headerShown:true, 
    headerTitleAlign: "center", 
  headerLeft: () => (
    <Image
      source={ logo }
      style={{ width:40, height:40, marginLeft: 20}}
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
      fontFamily:'Poppins',
    },
    headerTintColor: "gray",  
    tabBarLabel: '', 
    tabBarIcon: ({ color }) => (
      <Ionicons name="home-outline" color={color} size={30} style={{marginTop:5}}/>
    ),
  }