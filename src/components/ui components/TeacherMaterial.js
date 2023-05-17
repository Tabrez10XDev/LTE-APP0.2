import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, assets } from "../../../constants";
import { Ionicons, Feather } from '@expo/vector-icons';
import { Linking } from 'react-native'

const TeacherMaterial = ({ name, desc, type, size, link }) => {
    return (
        <View style={{ width: '100%', borderWidth: 1, borderColor: COLORS.darkGrey, borderStyle: 'dashed', padding: 18, borderRadius: 6, marginBottom: 24 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <Text style={{ ...Styles.semiBold, backgroundColor: COLORS.borderGrey, padding: 6, borderRadius: 14, paddingHorizontal: 12 }}>
                    {name} - {desc}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ marginEnd: 4, color: COLORS.grey }}>
                        {type}
                    </Text>

                    <Feather
                        style={{}}
                        name="book"
                        size={24}
                        color={COLORS.primary}
                    />
                </View>


            </View>
            <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between', alignItems: 'center' }}>

                <Text
                    onPress={() => {
                        Linking.openURL("https://res.cloudinary.com/db2bzxbn7/image/upload/s--hoSiWtBi--/v1683041135/lte_teacher_training_materials/sample2_jhxpzc.pdf");
                    }}
                    style={{ color: COLORS.primary, fontSize: 18 }}>
                    Click here to view the file
                </Text>

                <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 4, padding: 4 }}>
                    <Text style={{ marginTop: 1, color: COLORS.grey }}>
                        {size}
                    </Text>
                </View>



            </View>



        </View>
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


