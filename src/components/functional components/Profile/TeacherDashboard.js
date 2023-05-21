import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { ScrollView } from "react-native-gesture-handler";
import { TimePickerModal } from 'react-native-paper-dates';
import { Switch } from 'react-native-paper';
import { createContext, useContext } from 'react';
import { TextInput } from "@react-native-material/core";


const TeacherDashboard = ({ route, navigation }) => {

    const data = route.params

    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', width: Dimensions.get('window').width, justifyContent: 'center' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.blueShade }}>
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
                                {data.teacher_id.toString()}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems:'center' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                {data.spoc_name}
                                </Text>
                                <MaterialIcons 
                                onPress={()=>{
                                    navigation.navigate('Contact SPOC');
                                }}
                                name="contact-page" size={24} color={COLORS.primary} style={{position:'absolute', right:8}}/>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={Styles.greyText}>
                                    :
                                </Text>
                                <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.blackText}>
                                {data.city ?? "NA"}
                                </Text>
                            </View>
                        </View>

                    </View>


                </View>
            </ScrollView>

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