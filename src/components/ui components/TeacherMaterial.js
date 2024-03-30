import { View, Text, TouchableOpacity, Alert } from "react-native";
import Checkbox from 'expo-checkbox';
import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, assets } from "../../../constants";
import { Ionicons, Feather } from '@expo/vector-icons';
import { Linking } from 'react-native'

const TeacherMaterial = ({ name, desc, type, size, link }) => {


    async function openMaterial(){
        Alert.alert("Please Note",'Redistribution or copying this document outside the community is strictly prohibited', [
          {
            text: 'Okay',
            onPress: () =>  Linking.openURL(link)
          },
        ])
      }

    return (
        <TouchableOpacity 
        onPress={() => {
            openMaterial()
         }}
        style={{ width: '100%', borderWidth: 1, borderColor: COLORS.darkGrey, borderStyle: 'dashed', padding: 18, borderRadius: 6, marginBottom: 24 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text
                    style={{ color: COLORS.primary, fontSize: 16, flex:10 }}>
                    {name}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3, marginStart: 4, justifyContent: 'flex-end' }}>

                    <Text style={{ marginStart: 4, color: COLORS.grey, flex: 4 }}>
                        {type}
                    </Text>

                    <Feather
                        style={{ flex: 3 }}
                        name={type.toLowerCase() == "jpg" ? "image" : type.toLowerCase() == "mp4" ? "video" : "book"}
                        size={24}
                        color={COLORS.primary}
                    />
                </View>


            </View>
            <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>

                <Text
                    onPress={() => {
                        Linking.openURL(link);
                    }}
                    style={{ color: COLORS.textBlack, fontSize: 14 }}>
                    {desc}
                </Text>

                <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 4, padding: 4 }}>
                    <Text style={{ marginTop: 1, color: COLORS.grey }}>
                        {size}
                    </Text>
                </View>



            </View>



        </TouchableOpacity>
    )
}

export default TeacherMaterial;


const Styles = StyleSheet.create({
    paragraph: {
        fontSize: 16,
        fontFamily: FONTS.regular,
        textAlign: 'justify',
        flexWrap: 'wrap',
        color: COLORS.textBlack,

    },
    semiBold: {
        fontSize: SIZES.font,
        fontFamily: FONTS.semiBold,
        textAlign: 'justify',
        flexWrap: 'wrap',
        color: COLORS.textBlack,

    },
    bold: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.bold,
        textAlign: 'justify',
        flexWrap: 'wrap',
        color: COLORS.textBlack,
    },
    greyText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.regular,
        textAlign: 'justify',
        flexWrap: 'wrap',
        color: COLORS.grey,
    }
});


