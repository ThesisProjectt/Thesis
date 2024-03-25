import {View,Text,Image, StyleSheet,Button, Pressable, TextInput,KeyboardAvoidingView,Platform, Linking} from 'react-native'
import flouci from '../assets/flouci.webp'
import { useState } from 'react'
import axios from 'axios'


export default PaymentScreen = ({route,navigation}) => {
const {paymentId}=route.params
console.log(paymentId)

const [fullName,setFullName]=useState('')
const [emailAdress,setEmailAdress]=useState('')
const [cardNumber,setCardNumber]=useState('')
const [expiration,setExpiration]=useState('')
const [cvv2,setCCV2]=useState('')
const [error,setError]=useState({})


const validateForm=()=>{
    let error={}
    if(!fullName) error.fullName ="userName is required"
    if(!emailAdress) error.emailAdress ="Email Adress is required"
    if(!cardNumber) error.cardNumber ="Card Number is required"
    if (cardNumber !== "4242424242424242") error.cardNumber = "Card Number is Incorrect" 
    if(!expiration) error.expiration ="Expiration Date is required is required"
    if(!cvv2) error.cvv2 ="Your Card Security Number is required"
    setError(error)
    return Object.keys(error).length===0
  }



  // const handleSubmit= async (paymentId)=>{
  //   if (validateForm()) {
  //   await axios.post(`http://192.168.100.3:3000/api/verify/${paymentId}`)
  //   .then((result)=>{  
  //   console.log(result.data.success,"dataa")
  //       if(result.data.success==true) {
  //         navigation.navigate("Success",{paymentId:paymentId})
  //       }
  //       else if (result.data.success==false) {
  //         navigation.navigate("Fail",{paymentId:paymentId})
  //       }
  //    })
  //    .catch((error)=>{console.log("error",error)})

  //   }
  // }
  const handleSubmit= async (paymentId)=>{
    if (validateForm()) {
    await axios.post(`https://flouci.com/pay/confirm/test_card/${paymentId}`)
    .then((result)=>{  
    console.log(result,"dataa")
        // if(result.data.success==true) {
        //   navigation.navigate("Success",{paymentId:paymentId})
        // }
        // else if (result.data.success==false) {
        //   navigation.navigate("Fail",{paymentId:paymentId})
        // }
     })
     .catch((error)=>{console.log("error",error)})

    }
  }

  
    return (
        <View style={styles.container}>
            <View className="flex flex-row items-center self-start ml-4 mb-12" >
            <Image className="self-start"  source={flouci} style={styles.Image}/> 
            <Text onPress={()=>{Linking.openURL('https://onelink.to/flouci')}} className=" text-gray-600 font-bold  text-2xl"> flouci </Text>  
            </View>
            
            <View style={styles.main}>
            <Pressable className="flex flex-row  items-center justify-center h-10 rounded-xl w-56 self-center m-8" style={{backgroundColor:"#ed8048"}} > 
            <Text className=" text-white font-bold  text-lg  text-center"> Pay With flouci </Text>
            <Image className=" w-6 h-6"  source={flouci}  /> 
             </Pressable>
             <KeyboardAvoidingView  keyboardVerticalOffset={100} height={400}>
             <View className=" flex justify-center items-center"> 

            <TextInput placeholder='Full Name' value={fullName} onChangeText={setFullName}
            className="w-5/6  h-14 p-1  rounded-md m-1"  style={{borderColor:"#ececec", borderWidth:4}}/> 
                         {
  error.fullName? <Text style={styles.error}> {error.fullName}</Text>:null
}
            <TextInput placeholder='Email Adress' value={emailAdress} onChangeText={setEmailAdress}
            className="w-5/6  h-14 p-1 rounded-md m-1"  keyboardType='email-address'style={{borderColor:"#ececec", borderWidth:4}}/>
             {
  error.emailAdress? <Text style={styles.error}> {error.emailAdress}</Text>:null
}
            <TextInput placeholder='Card Number'    value={cardNumber} onChangeText={setCardNumber}
            className="w-5/6 h-14 p-1 rounded-md m-1"  keyboardType="numeric"style={{borderColor:"#ececec", borderWidth:4}}/>
             {
  error.cardNumber? <Text style={styles.error}> {error.cardNumber}</Text>:null
}
            <View className="flex flex-row items-center gap-2 m-6" > 
                <TextInput placeholder='MM/YY' onChangeText={setExpiration}
                className="w-2/5  h-14 p-1 rounded-md m-1" value={expiration}  
                style={{borderColor:"#ececec", borderWidth:4}}/>
                 {
  error.expiration? <Text style={styles.error}> {error.expiration}</Text>:null
}
                <TextInput placeholder='CVV2' value={cvv2} onChangeText={setCCV2}
                className="w-2/5  h-14 p-1 rounded-md m-1"  keyboardType="numeric"style={{borderColor:"#ececec", borderWidth:4}}/>
             {
  error.cvv2? <Text style={styles.error}> {error.cvv2}</Text>:null
}
            </View> 
        </View>    
            <Text onPress={handleSubmit} 
            className="w-4/5 self-center m-4 rounded-md bg-orange-500 text-white text-center h-8 text-lg"> Pay </Text>
           
            </KeyboardAvoidingView>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
      marginTop:40,
        justifyContent:"center",
        alignItems:"center"
    },
    Image:{
        width:40,
        height:40,
    },
    main : {
        marginTop:5,
        borderWidth:1,
        borderColor:"gray",
        borderRadius:20,
        width:"95%",
        
    },
    error:{
        color:"red",
        marginBottom:10
      },

})