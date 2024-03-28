import Avatar from '../Avatar';
import { Ionicons } from "@expo/vector-icons"; 

export default Profile = {
    headerShown:false, 
    headerTitleAlign: "center", 
    headerLeft: false, 
    headerRight: (props) => <Avatar {...props} />,
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
      <Ionicons name="person-outline" color={color} size={30} style={{marginTop:5}} />
    ),
  }