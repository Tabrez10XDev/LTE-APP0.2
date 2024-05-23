import { Text, View, Image, StyleSheet, TouchableOpacity, Switch } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import Lottie from 'lottie-react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";



const TeacherDashboard = ({ route, navigation }) => {

    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    function playAnimation() {
        setAnimSpeed(true)
    }


    function pauseAnimation() {
        setAnimSpeed(false)
    }

    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])

    const [data, setData] = useState({})

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        });

        return unsubscribe;
    }, [navigation]);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const getData = async () => {
        try {
            let value = await AsyncStorage.getItem('AuthState')

            playAnimation()
            axios.post(
                `${CONST.baseUrl}/teacher/get/teacherdetails/app`, {
                teacher_id: value
            }
            ).then((response) => {
                pauseAnimation()
                setData(response.data[0])
                console.log(response.data[0]);
            })
        } catch (e) {
            pauseAnimation()
            setData(route.params)
            console.error(e)
        }
    }


    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', alignItems: 'center' }}>
            {/* <ScrollView contentContainerStyle={{ alignItems: 'center', width: Dimensions.get('window').width, justifyContent: 'center' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.blueShade }}> */}
     
        <View style={{width:'165%', height:600,marginTop:-440,  backgroundColor:COLORS.primary, borderRadius:1000,}}>
        </View>
        <Image style={{objectFit:'contain',height:170, position:'absolute', top:80, alignSelf:'center'}} source={assets.profile}/> 

        <Text style={{color:COLORS.primary, fontSize:SIZES.large, marginTop:80, fontFamily:FONTS.bold}}>{data.teacher_name}</Text>
        <Text style={{color:COLORS.primary, fontSize:SIZES.font, marginTop:4, fontFamily:FONTS.regular}}>{data.email} | {data.contactno}</Text>
        <Text style={{color:COLORS.primary, fontSize:SIZES.font, marginTop:4, fontFamily:FONTS.regular}}>{data.role} | SPOC {data.spoc_name} | Audio {data.audio_status}</Text>

        <View style={{width:'90%', padding:20,
        borderRadius:10,
        marginTop:48,
                    shadowColor: "#000",
                    backgroundColor:'white',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.16,
                    shadowRadius: 3,
                    elevation: 3,
        }}>


            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', position:'relative'}}>      
            <Feather name="bell" size={24} color="black" />
            <Text
                            style={{
                                fontFamily: FONTS.semiBold,
                                fontSize: SIZES.font,
                                flexWrap: 'wrap',
                                marginLeft:16
                            }}>
                                Notifications
                        </Text> 

                            <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{
            alignSelf:'flex-end',
            position:'absolute',
            right:0,
            top:0,
               }}
      />   

            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Contact SPOC');
            }}
            style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', position:'relative', marginTop:48}}>      
            <MaterialCommunityIcons name="comment-quote-outline" size={24} color="black" />
                        <Text
                            style={{
                                fontFamily: FONTS.semiBold,
                                fontSize: SIZES.font,
                                flexWrap: 'wrap',
                                marginLeft:16
                            }}>
                                Contact us
                        </Text> 


            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', position:'relative', marginTop:48}}>      
            <MaterialIcons name="lock-outline" size={24} color="black" />
                                    <Text
                            style={{
                                fontFamily: FONTS.semiBold,
                                fontSize: SIZES.font,
                                flexWrap: 'wrap',
                                marginLeft:16
                            }}>
                                Delete My Account
                        </Text> 


            </TouchableOpacity>


            <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate('PrivacyPolicy');
                        }}
            style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', position:'relative', marginTop:48}}>      
            <MaterialIcons name="lock-outline" size={24} color="black" />
                                    <Text
                            style={{
                                fontFamily: FONTS.semiBold,
                                fontSize: SIZES.font,
                                flexWrap: 'wrap',
                                marginLeft:16
                            }}>
                                Privacy Policy
                        </Text> 


            </TouchableOpacity>





        </View>


            {/* </ScrollView> */}
            {animSpeed &&
                <View style={{
                    shadowColor: COLORS.homeCard,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 8,
                    position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.0)', alignSelf: 'center', padding: 24, marginTop: 16
                }}>

                    <View style={{ marginTop: '-40%' }}>
                        <Lottie source={require('../../../../assets/loading.json')} autoPlay style={{ height: 300, width: 300, alignSelf: 'center' }} loop ref={animRef} speed={1} />
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: SIZES.large,
                                flexWrap: 'wrap',
                                marginTop: -48
                            }}>
                        </Text>
                    </View>

                </View>

            }

        </View>
    )
}


export default TeacherDashboard;


const Styles = StyleSheet.create({
    greyText: {
        fontSize: 18,
        fontFamily: FONTS.regular,
        textAlign: 'justify',
        flexWrap: 'nowrap',
        color: COLORS.textGrey,

    },
    blackText: {
        fontSize: 18,
        fontFamily: FONTS.regular,
        textAlign: 'justify',
        flexWrap: 'nowrap',
        color: 'black',
        marginStart: 4

    },
});


// <Image
// source={assets.profile}
// style={{ height: 160, width: 160, marginTop: 24 }}
// />

// <View style={{ width: '90%', borderRadius: 16, backgroundColor: 'white', padding: 8, paddingHorizontal: 16 }}>

  

//     <View style={{flexDirection:'row', marginTop:8}}>
//         <View style={{flex:1}}>
//         <Text style={Styles.greyText}>
//             Name
//         </Text>
//         </View>
//         <View style={{flex:2, flexDirection:'row'}}>
//         <Text style={Styles.greyText}>
//                 :
//             </Text>
//             <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
//                 {data.teacher_name}
//             </Text>
//         </View>
//     </View>

//     <View style={{flexDirection:'row', marginTop:6}}>
//         <View style={{flex:1}}>
//         <Text style={Styles.greyText}>
//             Contact No
//         </Text>
//         </View>
//         <View style={{flex:2, flexDirection:'row'}}>
//         <Text style={Styles.greyText}>
//                 :
//             </Text>
//             <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
//                 {data.contactno}
//             </Text>
//         </View>
//     </View>

//     <View style={{flexDirection:'row', marginTop:6}}>
//         <View style={{flex:1}}>
//         <Text style={Styles.greyText}>
//             Email
//         </Text>
//         </View>
//         <View style={{flex:2, flexDirection:'row'}}>
//         <Text style={Styles.greyText}>
//                 :
//             </Text>
//             <Text style={Styles.blackText}>
//                 {data.email}
//             </Text>
//         </View>
//     </View>

//     <View style={{flexDirection:'row', marginTop:6}}>
//         <View style={{flex:1}}>
//         <Text style={Styles.greyText}>
//             Role
//         </Text>
//         </View>
//         <View style={{flex:2, flexDirection:'row'}}>
//         <Text style={Styles.greyText}>
//                 :
//             </Text>
//             <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
//                 {data.role}
//             </Text>
//         </View>
//     </View>

//     <View style={{flexDirection:'row', marginTop:6}}>
//         <View style={{flex:1}}>
//         <Text style={Styles.greyText}>
//             SPOC Name
//         </Text>
//         </View>
//         <View style={{flex:2, flexDirection:'row'}}>
//         <Text style={Styles.greyText}>
//                 :
//             </Text>
//             <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
//                 {data.spoc_name ?? "NA"}
//             </Text>
//         </View>
//     </View>

//     <View style={{flexDirection:'row', marginTop:6}}>
//         <View style={{flex:1}}>
//         <Text style={Styles.greyText}>
//             City
//         </Text>
//         </View>
//         <View style={{flex:2, flexDirection:'row'}}>
//         <Text style={Styles.greyText}>
//                 :
//             </Text>
//             <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
//                 {data.city ?? "NA"}
//             </Text>
//         </View>
        
//     </View>

//     <View style={{flexDirection:'row', marginTop:6}}>
//         <View style={{flex:1}}>
//         <Text style={Styles.greyText}>
//             Audio Status
//         </Text>
//         </View>
//         <View style={{flex:2, flexDirection:'row'}}>
//         <Text style={Styles.greyText}>
//                 :
//             </Text>
//             <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
//                 {data.audio_status ?? "NA"}
//             </Text>
//         </View>

        
//     </View>


    

// </View>

