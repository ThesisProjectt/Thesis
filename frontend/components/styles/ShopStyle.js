import Avatar from '../Avatar';
import { Feather, Entypo } from "@expo/vector-icons"; 
import logo from "../../assets/LOGO Cleaning.png"
import { Image } from 'react-native';

export default Shopping = {
    headerShown:true, 
    headerTitleAlign: "center", 
    headerLeft: false, 
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
      fontFamily:'Poppins',
    },
    headerTintColor: "gray",
    tabBarLabel: '',
    tabBarStyle: {
      borderTopWidth: 0,
    },
    tabBarIcon: ({ color }) => (
      <Feather name="shopping-bag" color={color} size={30} style={{marginTop:5}}/>
    ),
  }