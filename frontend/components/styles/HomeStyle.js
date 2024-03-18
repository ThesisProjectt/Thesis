
import Avatar from '../Avatar';
import { Ionicons } from "@expo/vector-icons"; 

export default Home = {
    headerShown:true, 
    headerTitleAlign: "center", 
    headerLeft: false, 
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