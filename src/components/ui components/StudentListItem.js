import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { React, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, assets } from "../../../constants";
import { Ionicons } from '@expo/vector-icons';



const StudentListItem = ({onclick, name, education}) => {

    const [firstLetters, setFirstLetters] = useState("")

    function getFirstLetters(){
        const _name = name.split(" ")
        let list = ""
        _name.map((ele)=>{
            if(ele != undefined){
            list = list + ele[0]
            }
        })
        setFirstLetters(list)
    }

    useEffect(() => {
        getFirstLetters()
    }, [])



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
                    {firstLetters}
                </Text>
            </View>

            <View style={{marginStart:12, paddingVertical:8, justifyContent:'space-between'}}>
                <Text style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: 16,
                    color: 'black'
                }}>
                    {name}
                </Text>
                <Text style={{
                    fontFamily: FONTS.regular,
                    fontSize: 14,
                    color: COLORS.grey,
                }}>
                    {education}
                </Text>
            </View>

            <Ionicons name="settings" size={22} color="#000000BD" style={{ position: 'absolute', right: 16, top:20 }} />


        </TouchableOpacity>
    )
}

export default StudentListItem;