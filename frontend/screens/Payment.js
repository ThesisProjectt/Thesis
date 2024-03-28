import {View,Text, TextInput, Button,Linking, FlatList} from 'react-native'
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
        

    const [amount,setAmount]=useState('')
    const [myurl,setMyUrl]=useState('')
const message="hi there"

const [paymentId,setPaymentId]=useState({})

    const setPrice = async () =>{
       await axios.post(`${ip}:3000/api/payment`,{amount:4000})
        .then((res)=>{ const {result, path,payload} = res.data 
        console.log(path,"from payment")
        setMyUrl(result.result.link)
        console.log(result,"succes ?")
        console.log(myurl,"myurl")
        console.log(payload,"success")
        navigation.navigate("Flouci",{myurl:myurl})
    })
        .catch((error)=>{console.log(error,"error")})   
        }



    
    

const [form,setFrom]=useState({})
const onChange=()=>{
    setFrom({})
}

        return (
        <View className="flex-1 items-center justify-center">
           
                <Text> Price is ${amount} </Text>
                <Button  title="Flouci" onPress={()=>{setPrice()}}     />  
        
        </View>
    )
}