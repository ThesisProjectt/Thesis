import { View,Text,StyleSheet, ScrollView} from "react-native";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default CustomPack = ({route}) =>{
    const [packs,setPacks]=useState([])
    const [idpack,setIdPack]=useState('')
    const {catid} =route.params
    console.log("packsssssss",catid)
   
    


      const fetchPacks = async (id) => {

        try {
      const response = await fetch(`http://192.168.11.126:3000/pack/get/${id}`)
        const data = await response.json()
        const packid = await AsyncStorage.getItem("packid")
        .then ((res)=>{console.log(res,"res"),setIdPack(res)}) 
        setPacks(data)
        }
        catch(error){console.error("error fetching error",error)
      
      }
      }

      useEffect(()=>{
        fetchPacks(catid)
    },[])
console.log(idpack,"idpack")
    
    return (
       

        
        
            <View style={[styles.container]}>

            
                {packs.map((elemeent,index)=>{
                    if (elemeent.id==idpack) {
                    return (
                        
                    <View  key={index} style={{backgroundColor:"midnightblue",width:320, borderRadius:20,padding:2}}>
                            <View style={styles.name}>
                                <Text style={{fontSize:20,fontWeight:"bold"}}> {elemeent.name} </Text> 
                                <Text style={{fontSize:20,fontWeight:"bold"}}> Price : {(elemeent?.Services.reduce((total,element)=>  (total+element.price*element?.PackHasServices?.quantity),0))} </Text> 
                            </View> 
                            {elemeent.Services.map((item,index)=>{
                            
                            {console.log(elemeent.id,idpack,"compare")}
                          
                             return (
                            <View key={index} style={{display:"flex",flexDirection:"row",marginTop:4}}> 
                                     <Text style={{fontSize:18,color:"white",fontWeight:"bold",padding:4}}> {item.name}</Text>
                                     <Text style={{fontSize:18,color:"white",fontWeight:"bold",padding:4,marginLeft:"auto"}}> Price : {item.price}</Text>
                                     {/* <Text style={{fontSize:18,color:"white",fontWeight:"bold",padding:4}}> {item?.PackHasServices?.quantity}</Text> */}
                            </View>
                             )
                        })}
                    
                    <View style={{backgroundColor:"EFFFFD"}}>

                    </View>
                    
                    </View>  
                    
                    )}
                })}
                <View style={{backgroundColor:"midnightblue",width:320, borderRadius:14,padding:2,marginTop:16,height:40}}>
                        <Text style={{color:"white",fontSize:22,fontWeight:"bold",textAlign:"center"}}
                        onPress={()=>{navigation.navigate("Request"),{pack_id:packid}}}
> Purchase </Text>
                    </View>
            </View> 
       
       
    )
}


const styles =StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#EFFFFD",
       
        },
     name : {
        margin:5,
        width:"95%",
        height:12,
        backgroundColor:"white",
         marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:80,
        borderRadius:20
       
    }
})