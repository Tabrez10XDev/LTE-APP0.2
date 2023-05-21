import { Text, View, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown';

import { ScrollView } from "react-native-gesture-handler";
import { TimePickerModal } from 'react-native-paper-dates';
import { Switch } from 'react-native-paper';
import { createContext, useContext } from 'react';
const ContactSpoc = () => {

    const genderList = [
        {
            label: "Male",
            value: "MALE",
        },
        {
            label: "Female",
            value: "FEMALE",
        },
        {
            label: "Others",
            value: "UNSPECIFIED",
        },
    ]


    return (
        <SafeAreaView style={{ backgroundColor: COLORS.blueShade, width: '100%', height: '100%', alignItems: 'center' }}>
            <Text style={{
                fontSize: 20,
                alignContent: "center",
                textAlign: 'center',
                fontFamily: FONTS.semiBold,
                marginTop: 16,
            }}>
                Contact SPOC
            </Text>


            <Text style={{
                fontSize: 16,
                alignContent: "center",
                textAlign: 'center',
                fontFamily: FONTS.semiBold,
                marginTop: 64,
                color: COLORS.textGrey,
                alignSelf: 'flex-start',
                marginStart: 24

            }}>
                Type
            </Text>


            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={genderList}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value=""
                onChange={item => {
                    //  setValue(item.value);
                }}

            />


            <Text style={{
                fontSize: 16,
                alignContent: "center",
                textAlign: 'center',
                fontFamily: FONTS.semiBold,
                marginTop: 64,
                color: COLORS.textGrey,
                alignSelf: 'flex-start',
                marginStart: 24
            }}>
                Message
            </Text>

            <TextInput multiline
                returnKeyType="done"
                blurOnSubmit={true}
                fontSize={16}
                placeholder="Type Here" style={{ width: '90%', backgroundColor: 'white', marginTop: 4, padding: 8, height: 200, borderRadius: 8 }}>

            </TextInput>

            <View style={{ flexDirection: 'row', marginTop: 6, width: '90%', justifyContent: 'space-between' }}>
                <Text style={{
                    fontSize: 12,
                    alignContent: "center",
                    textAlign: 'center',
                    fontFamily: FONTS.semiBold,
                    color: COLORS.green,
                    alignSelf: 'flex-start',
                }}>
                    Maximum 200 Characters*
                </Text>

                <Text style={{
                    fontSize: 12,
                    alignContent: "center",
                    textAlign: 'center',
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                    alignSelf: 'flex-start',
                }}>
                    0/200
                </Text>
            </View>

            <TouchableOpacity style={{ width: '90%', height: 60, backgroundColor: COLORS.blue, borderRadius: 10, marginTop: 48, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 18,
                        alignContent: "center",
                        textAlign: 'center',
                        fontFamily: FONTS.bold,
                        color: 'white',
                        marginRight: 8
                    }}>
                        Send
                    </Text>

                    <FontAwesome name="send" size={22} color="white" />
                </View>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default ContactSpoc;

const styles = StyleSheet.create({
    dropdown: {
        height: 60,
        borderRadius: 6,
        borderWidth: 0,
        width: '90%',
        paddingHorizontal: 12,
        backgroundColor: 'white',
        marginTop: 4

    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: COLORS.textGrey
    },
    selectedTextStyle: {
        fontSize: SIZES.smallFont,
        fontFamily: FONTS.semiBold
    },

});