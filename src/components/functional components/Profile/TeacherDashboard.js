import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import Lottie from 'lottie-react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
            })
        } catch (e) {
            pauseAnimation()
            setData(route.params)
            console.error(e)
        }
    }


    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', width: Dimensions.get('window').width, justifyContent: 'center' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.blueShade }}>
                {console.log(data, "profile")}
                <Image
                    source={assets.profile}
                    style={{ height: 160, width: 160, marginTop: 24 }}
                />

                <View style={{ width: '90%', borderRadius: 16, backgroundColor: 'white', padding: 8, paddingHorizontal: 16 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ maxWidth: '30%' }}>
                            <Text style={Styles.greyText}>
                                Name
                            </Text>
                            <Text style={Styles.greyText}>
                                Contact No
                            </Text>
                            <Text style={Styles.greyText}>
                                Email
                            </Text>
                            <Text style={Styles.greyText}>
                                Role
                            </Text>
                            <Text style={Styles.greyText}>
                                Teacher ID
                            </Text>
                            <Text style={Styles.greyText}>
                                SPOC Name
                            </Text>
                            <Text style={Styles.greyText}>
                                City
                            </Text>
                            <Text style={Styles.greyText}>
                                Audio Status
                            </Text>

                        </View>
                        <View style={{ maxWidth: '60%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {data.teacher_name}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {data.contactno}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {data.email}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {data.role}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {route.params.teacher_id}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {data.spoc_name ?? "NA"}
                                </Text>

                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {data.city ?? "NA"}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                    {data.audio_status ?? "NA"}
                                </Text>
                            </View>
                        </View>

                    </View>


                </View>
            </ScrollView>
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
        marginVertical: 6

    },
    blackText: {
        fontSize: 18,
        fontFamily: FONTS.regular,
        textAlign: 'justify',
        flexWrap: 'nowrap',
        color: 'black',
        marginVertical: 6,
        marginStart: 4

    },
});