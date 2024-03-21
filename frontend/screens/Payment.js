import {View,Text, TextInput, Button,Linking} from 'react-native'
import axios from 'axios'
import { useState } from 'react'






export default Payment = ({navigation}) =>{

    const openURL = async (url) =>{
        const isSupported = await Linking.canOpenURL(url)
        if (isSupported) {
            await Linking.openURL(url)
        }
        else {
            Alert.alert('none')
        }
        }
        const message = "Ramadhan Moubarak"

    const [amount,setAmount]=useState('')


    const setPrice = (obj) =>{
    
        axios.post(`http://192.168.100.3:3000/api/payment`,obj)
        .then((res)=>{console.log("success")})
        .catch((error)=>{console.log(error,"error")})
        }
    

    return (
        <View className="flex-1 items-center justify-center">
           
                {/* <Button  title="Purchase" onPress={()=>{Linking.openURL(`https://app.flouci.com`)}}/>
                <Button  title="Flouci App" onPress={()=>{Linking.openURL(`https://play.google.com/store/apps/details?id=com.kaoun.flouci`)}}/> */}


<TextInput onChangeText={(value)=>{setAmount(value)}} style={{borderWidth:2,borderColor:"black",width:200,margin:8}}/>
<Text> Price is ${amount} </Text>
<Button  title="Flouci" onPress={()=>{setPrice({amount:amount})}}     />



{/*                 
                <Button  title="what's up" onPress={()=>{Linking.openURL(`Whatsapp://send?phone=${90378290}&text=${message}`)}}/>
                <Button  title="youtube" onPress={()=>{Linking.openURL("https://www.youtube.com")}}/>
                <Button  title="Map" onPress={()=>{Linking.openURL("https://www.google.com/maps/search/?api=1&query=tunisia")}}/>
                <Button  title="facebook" onPress={()=>{Linking.openURL(`fb://profile`)}}/>
                <Button  title="Galery" onPress={()=>{Linking.openURL(`Content://media/internal/image`)}}/> */}
           
        </View>
    )
}