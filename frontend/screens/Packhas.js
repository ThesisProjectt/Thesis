import { StatusBar,StyleSheet,Text,View,Dimensions,Image, Button } from "react-native";
import Carousel,{Pagination} from 'react-native-snap-carousel'
import { useState,useRef,useEffect} from "react";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
export  const Slider_Width=Dimensions.get('window').width+40
export const Item_Width=Math.round(Slider_Width*0.8)



export default  Carouss = ({navigation,route}) =>{
  const {catid} =route.params
console.log("packsssssss",catid)
const [loading,setLoading]=useState(false)




const [packs,setPacks]=useState([])
const [total,setTotal]=useState(0)

      const fetchPacks = async (id) => {
        try {
          setLoading(true)
      const response = await fetch(`http://192.168.11.126:3000/pack/get/${id}`)
        const data = await response.json()
        console.log(data)
        setPacks(data)
        setLoading(false)
        }
        catch(error){console.error("error fetching error",error)
      
      }
      }

      const addPack = async (obj) => {
        const user = JSON.parse(await AsyncStorage.getItem("user"));

        const data = {name:"Custom Pack",status:"ClientPack",client_id:user.id} 
          axios.post("http://192.168.11.126:3000/pack/addPack",data)
          .then(async (res)=>{console.log(res.data)
       await AsyncStorage.setItem("packid",JSON.stringify(res.data.id))
          })
          
          .catch((error)=>{console.log(error,"error")})
      }


      
 
useEffect(()=>{
    fetchPacks(catid)
},[])


    const [index, setIndex] = useState();
     const isCarousel = useRef(null)
     return (
        <View style={styles.container}>
          <Text style={{fontSize:20,color:"gray"}}> {} </Text>
            <Carousel
            ref={isCarousel}
            data={packs}
            renderItem={ ({item})=>{
                return (
                  <View style={{width:320}}> 
                    

<View style={styles.flatContainer}>
<View style={{marginTop:8,marginRight:4,marginLeft:4,backgroundColor:"white",width:"95%",marginLeft:"auto", marginRight:"auto",borderRadius:20,height:80}}>
                    <Text className="font-bold text-xl text-left h-8 mt-2 text-blue-400 " > {item.name} </Text>
                    <Text className=" text-lg font-bold text-blue-400" >  Total : {(item?.Services.reduce((total,element)=>  (total+element.price),0))}  </Text>
                    </View> 
                    <View className="p-4">
                {item.Services.map((ele,index)=> {return (      
                                <View key={index}> 
                                <Text className="text-white text-lg font-bold" style={{fontFamily:"Poppins-Regular"}}>  {`\u2022 ${ele.name}`}    </Text>
                                <Text className="text-white text-lg font-bold" style={{fontFamily:"Poppins-Regular"}}>  {ele.PackHasServices.quantity==null?'':`\u2022 ${ele.PackHasServices.quantity}`}    </Text>
                                 </View>
                              )})}
                              
                    </View>
                     </View>
                   

<Text style={{width:320,backgroundColor:"#008BEA",textAlign:"center",color:"white",fontSize:22,borderRadius:16,height:40,fontFamily:"Poppins-Regular"}}
onPress={()=>{navigation.navigate("Request", {packid:item.id})}}> Purchase </Text>
 
                    </View>
                    
                )
              }}
              sliderWidth={Slider_Width}
              itemWidth={Item_Width}
              onSnaptoItem={index=>setIndex(index)}
              keyExtractor={(item)=>item.id}
              
              />
<Text style={{width:320,backgroundColor:"#008BEA",textAlign:"center",color:"white",fontSize:22,borderRadius:20,height:40,fontFamily:"Poppins-Regular"}}
onPress={()=>{addPack();navigation.navigate("CreateCustom",{catid:catid})}}
> Make You Custom Pack </Text>
       </View>
     )
}

const styles= StyleSheet.create({
    container:{
flex:1,
paddingTop:20,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#EFFFFD",
        // marginBottom:50
    },
    flatContainer:{
    width:320,
    minHeight:360,
    borderRadius:20,
    backgroundColor:"#008BEA",
    marginBottom:20
  
}
})