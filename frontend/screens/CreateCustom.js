import { View,Text,TextInput,Button,Image, Pressable,ScrollView } from "react-native";
import { useState,useEffect,useRef  } from "react";
import { Checkbox } from 'react-native-paper'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default CreateCustom = ({navigation,route})=>{
  const {catid,catName,packid,serviceid} =route.params
console.log(catid,"from creation")




    const[services,setServices]=useState([])
    const[packs,setPacks]=useState([])
    const[quantity,setQuantity]=useState('1')
    const [checked, setChecked] = useState(false);
   
   
      const fetchServices = async (id) => {
        try {
      const response = await fetch(`http://192.168.11.126:3000/services/getServicebycategory/${id}`)
        const data = await response.json()
        console.log(data)
        setServices(data)
        }
        catch(error){console.error("error fetching error",error)
      
      }
      }

      const createCustom = async (element)=> {
        const packid= await AsyncStorage.getItem("packid")
      const obj = {
        pack_id:packid,
        service_id:element.id,
        quantity:quantity,
        total:element.price*quantity
      }
        axios.post("http://192.168.11.126:3000/packhasservice/addAPack",obj)
        .then((res)=>{console.log("added")})  
        .catch((error)=>{console.log(error,"error")})
    }

useEffect(()=>{
  fetchServices(catid)      
},[])



const deleteFromPack = async (element) => {
  const obj = {
    pack_id:packid,
    service_id:element.id,
  }
  axios.delete(`http://192.168.11.126:3000/packhasservice/deleteFromPack`,obj)
  .then((res)=>{console.log("deleted")})  
        .catch((error)=>{console.log(error,"error")})
}



    return (
      <ScrollView showsVerticalScrollIndicator={false}>

      
        <View className="flex-1 items-center content-center mt-10">
        <Text className="w-36 text-center text-gray-400 font-bold text-opacity-50 text-xl "> Custom Pack</Text>
    <Text className="text-sky-700 text-xl font-bold text-left mr-auto mb-4" style={{color:"#02337B"}}>Select your cleaning needs</Text>
        {services?.map((element,index)=>{
          return (
        <View key={index} className=" flex-row items-center mb-4 ">
<View  className="w-10 h-10 bg-white rounded-lg shadow mr-2 flex items-center justify-center"> 
<Image className="w-8 h-8 rounded" source={{uri:element.image}}  />
{/* {console.log(element?.PackHasServices?.quantity)}
{console.log(element,"element")}   */}
  
</View>
    

    <View className="w-60  h-10 bg-white rounded-lg shadow flex  flex-row justify-start items-center"> 
    <Text className="text-blue-800  bg-white font-bold ml-2 mt-2.5">{element.name} </Text>
    <Text className="text-blue-800  bg-white font-bold ml-auto mt-2.5 ">{element.price*quantity}</Text>
    {/* <Text className="text-blue-800  bg-white font-bold ml-2 mt-2.5">{element.price*element?.PackHasServices?.quantity}</Text> */}
        
        {/* <View className="ml-auto flex flex-row items-center mr-2"> 
        <Pressable className="w-4 h-4 bg-gray-100 rounded shadow" onPress={()=>{setQuantity((quantity)+1)}}><Text className="text-sky-900 text-xs text-center font-medium">+</Text></Pressable>
        <TextInput 
        Number  
        
        keyboardType="number-pad"  
        
        
        onChangeText={setQuantity}
        className="w-3 ml-2 mr-2"
        />
       <Pressable className="w-4 h-4 bg-gray-100 rounded shadow" onPress={()=>{setQuantity(quantity-1)}}><Text className="text-sky-900 text-xs font-medium  text-center">-</Text></Pressable>
        </View> */}
       
    </View>

        <View className="w-12 h-10 bg-white rounded-lg shadow ml-2" > 

        

        <Button title="add" onPress={() => {createCustom(element)}} />
        
        {/* <Checkbox   status={checked ? 'checked' : 'unchecked'}  onPress={() => {createCustom({
          pack_id:packid,
          service_id:element.id,
          quantity:quantity,
          total:element.price*quantity
        });setChecked(!checked);}}/> */}
        
        </View>
        
          
        </View>
          )
        })}
        <View className="bg-white flex-row items-center w-4/5 h-10 mb-4">
        <Text className=" text-xl font-bold h-8" style={{color:"#02337B"}}> Total : </Text>
        <Text className=" text-xl font-bold h-8 ml-auto" style={{color:"#02337B"}}> Price: {(services.reduce((total,item)=>  (total+item.price*quantity),0))}$ </Text>
        </View>
    
        <View>
          
        <Pressable 
        style={{backgroundColor:"#02337B",width:300,height:48,borderRadius:20,marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center"}} >
          <Text  className="text-white text-center text-xl" onPress={()=>{navigation.navigate("CustomPack",{catid:catid,packid:packid})}}>Create Your Pack</Text>
        </Pressable>
        <Pressable  style={{backgroundColor:"#B21212",width:300,height:48,borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center"}} >
          <Text className="text-white text-center text-xl " onPress={()=>{navigation.navigate("Carouss")}}>Cancel</Text>
        </Pressable>
         
        </View>
       
        </View>
        </ScrollView>
    )
  }


