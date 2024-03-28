import * as React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Signup from './screens/Signup';
import Login from './screens/Login';
import Forget from './screens/Forget';
import NewPwd from './screens/NewPwd';
import FirstScreen from "./screens/firstScreen";
import BottomNav from './components/BottomNav';
import Loading from './components/Loading';
import About from './screens/About';
import AboutStyle from './components/styles/AboutStyle';
import Request from './screens/Request';
import RequestStyle from './components/styles/RequestStyle';
import Payment from './screens/Payment'
import Success from './screens/Success'
import Fail from './screens/Fail'
import PackStyle from './components/styles/PackStyle';
import CreatePack from './screens/CreatePack';
import CreatePackServices from './screens/CreatePackServices';
import PaymentScreen from './screens/PaymentScreen';
import Packhas from './screens/Packhas';
import Feedback from './screens/Feedback';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins': require("./assets/fonts/Poppins-Bold.ttf"),
    'Poppins-Regular':require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Light':require('./assets/fonts/Poppins-Light.ttf')
  });
  if (!fontsLoaded) { return null}

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='FirstScreen' component={FirstScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Packs" component={Packhas} options={PackStyle}/>
        <Stack.Screen name='BottomNav' component={BottomNav} options={{headerShown:false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Forget' component={Forget} options={{headerShown:false}}/>
        <Stack.Screen name='NewPwd' component={NewPwd} options={{headerShown:false}}/>
        <Stack.Screen name='Loading' component={Loading} options={{headerShown:false}}/>
        <Stack.Screen name='About Us' component={About} options={AboutStyle}/>
        <Stack.Screen name='Request' component={Request} options={RequestStyle}/>
        <Stack.Screen name='Custom Pack' component={CreatePack} options={RequestStyle}/>
        <Stack.Screen name='Custom' component={CreatePackServices} options={RequestStyle}/>
        <Stack.Screen name='Payment' component={Payment} options={{headerShown:false}}/>
        <Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Success' component={Success} options={{headerShown:false}}/>
        <Stack.Screen name='Fail' component={Fail} options={{headerShown:false}}/>
        <Stack.Screen name='Feedback' component={Feedback} options={RequestStyle}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}