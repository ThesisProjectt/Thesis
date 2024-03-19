import * as React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Catego from './screens/Catego';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Forget from './screens/Forget';
import NewPwd from './screens/NewPwd';
import CreateCustom from './screens/CreateCustom';
import Carouss from './screens/Packhas'
import FirstScreen from "./screens/firstScreen";
import BottomNav from './components/BottomNav';
import Loading from './components/Loading';
import About from './screens/About';
import AboutStyle from './components/styles/AboutStyle';
import Request from './screens/Request';
import RequestStyle from './components/styles/RequestStyle';

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
        <Stack.Screen name='Categories' component={Catego} options={{headerShown:false}}/> 
        <Stack.Screen name="Carouss" component={Carouss} options={{headerShown:false}} />       
        <Stack.Screen name='BottomNav' component={BottomNav} options={{headerShown:false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Forget' component={Forget} options={{headerShown:false}}/>
        <Stack.Screen name='NewPwd' component={NewPwd} options={{headerShown:false}}/>
        <Stack.Screen name="CreateCustom" component={CreateCustom}/>
        <Stack.Screen name='Loading' component={Loading} options={{headerShown:false}}/>
        <Stack.Screen name='About Us' component={About} options={AboutStyle}/>
        <Stack.Screen name='Request' component={Request} options={RequestStyle}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}