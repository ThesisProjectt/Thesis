import Avatar from '../Avatar';
import { Ionicons } from "@expo/vector-icons"; 

export default Profile = {
    headerShown:false, 
    tabBarLabel: '',
    tabBarIcon: ({ color }) => (
      <Ionicons name="person-outline" color={color} size={30} style={{marginTop:5}} />
    ),
  }