import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, assets } from "../../../constants";
import { Ionicons } from '@expo/vector-icons';



const StudentListItem = ({onclick}) => {
    return (
        <TouchableOpacity 
        onPress={()=>{onclick()}}
        style={{ width: '100%', flexDirection: 'row', height: 80, padding: 12, marginTop:4, borderBottomWidth:1, borderColor:COLORS.borderGrey }}>
            <View style={{ height: 50, width: 50, backgroundColor: '#C9CBFD', justifyContent: 'center', alignItems: 'center', borderRadius:4 }}>
                <Text style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: 16,
                    color: '#3F4188'
                }}>
                    DS
                </Text>
            </View>

            <View style={{marginStart:12, paddingVertical:8, justifyContent:'space-between'}}>
                <Text style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: 14,
                    color: 'black'
                }}>
                    Mr. Deepak Sharma
                </Text>
                <Text style={{
                    fontFamily: FONTS.regular,
                    fontSize: 12,
                    color: COLORS.grey,
                }}>
                    8th Grade
                </Text>
            </View>

            <Ionicons name="settings" size={22} color="#000000BD" style={{ position: 'absolute', right: 16, top:20 }} />


        </TouchableOpacity>
    )
}

export default StudentListItem;