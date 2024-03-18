import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from '../screens/Catego';
import HomePage from '../screens/HomePage';
import CreateCustom from '../screens/CreateCustom';
import Carouss from '../screens/Packhas'
import Home from './styles/HomeStyle';
import Profile from './styles/ProfileStyle';
import Cart from './styles/CartStyle';
import Notification from './styles/NotificationStyle';
import Chat from './styles/ChatStyle';
import Profil from '../screens/Pofile'

const Tab = createBottomTabNavigator();

function BottomNav() {

  return (
    <Tab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen name="Profile" component={Profil} options={Profile}/>
      <Tab.Screen name="Categories" component={Categories} options={Cart}/>
      <Tab.Screen name="Home" component={HomePage} options={Home}/>
      <Tab.Screen name="Notification" component={HomePage} options={Notification}/>
      <Tab.Screen name="Chat" component={HomePage} options={Chat}/>
    </Tab.Navigator>
  );
}

export default BottomNav