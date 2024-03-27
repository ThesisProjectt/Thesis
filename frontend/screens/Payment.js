import {View,Text, TextInput, Button,Linking, FlatList} from 'react-native'
import axios from 'axios'
import { useState } from 'react'
import Success from './Success'
import ip from '../functions/IpAdress'






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
        

    const [amount,setAmount]=useState('')
const message="hi there"

const [paymentId,setPaymentId]=useState({})

    const setPrice = async () =>{
       await axios.post(`${ip}:3000/api/payment`,{amount:amount})
    
        .then((res)=>{ const {result} = res.data 
        Linking.openURL(result.result.link)
        console.log(result.result.link)
        setPaymentId()
        console.log(result.result.payment_id)
        navigation.navigate("PaymentScreen",{paymentId:result.result.payment_id})
    })
        .catch((error)=>{console.log(error,"error")})   
        }



    
    

const [form,setFrom]=useState({})
const onChange=()=>{
    setFrom({})
}

        return (
        <View className="flex-1 items-center justify-center">
           
                 {/* <Button  title="Purchase" onPress={()=>{Linking.openURL(`https://app.flouci.com`)}}/>
                <Button  title="Flouci App" onPress={()=>{Linking.openURL(`https://play.google.com/store/apps/details?id=com.kaoun.flouci`)}}/>  */}



<TextInput onChangeText={(value)=>{setAmount(value)}} style={{borderWidth:2,borderColor:"black",width:200,margin:8}}/>
<Text> Price is ${amount} </Text>
<Button  title="Flouci" onPress={()=>{setPrice()}}     />

<View

>

</View>

              
                {/* <Button  title="what's up" onPress={()=>{Linking.openURL(`Whatsapp://send?phone=${90378290}&text=${message}`)}}/>
                <Button  title="youtube" onPress={()=>{Linking.openURL("https://www.youtube.com")}}/>
                <Button  title="youtube" onPress={()=>{Linking.openURL("flouci://")}}/>

                <Button  title="Map" onPress={()=>{Linking.openURL("https://www.google.com/maps/search/?api=1&query=Rades")}}/>
                <Button  title="facebook" onPress={()=>{Linking.openURL(`fb://profile`)}}/>
                <Button  title="Galery" onPress={()=>{Linking.openURL(`Content://media/internal/image`)}}/>  */}
           
        </View>
    )
}