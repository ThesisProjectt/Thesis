import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from '../screens/Categories';
import HomePage from '../screens/HomePage';
import Home from './styles/HomeStyle';
import Profile from './styles/ProfileStyle';
import Catego from './styles/CategoStyle';
import Notif from './styles/NotificationStyle';
import Shopping from './styles/ShopStyle';
import Profil from '../screens/Pofile'
import Notification from '../screens/Notification';
import Shop from '../screens/Shop';

const Tab = createBottomTabNavigator();

function BottomNav() {

  return (
    <Tab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: '#694fad' }}>
      <Tab.Screen name="Profile" component={Profil} options={Profile}/>
      <Tab.Screen name="Categories" component={Categories} options={Catego}/>
      <Tab.Screen name="Home" component={HomePage} options={Home}/>
      <Tab.Screen name="Shop" component={Shop} options={Shopping}/>
      <Tab.Screen name="Notification" component={Notification} options={Notif}/>
    </Tab.Navigator>
  );
}

export default BottomNav