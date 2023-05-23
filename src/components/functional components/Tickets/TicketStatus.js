import { Text, View, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import TicketListItem from "../../ui components/TicketListItem";


const TicketStatus = () => {

    const [stackIndex, setStackIndex] = useState(1);


    return (
        <View style={{ backgroundColor: COLORS.blueShade, width: '100%', height: '100%', padding: 16, alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center' }}>

                <TextInput onChangeText={(text) => handleSearch(text)} placeholder="Search..." style={{ height: 60, width: '100%', borderRadius: 16, backgroundColor:'white', paddingHorizontal: 42, alignItems: 'center', flexDirection: 'row' }} selectionColor={COLORS.grey}>

                </TextInput>
                <Ionicons name="md-search" size={22} color={COLORS.primary} style={{ position: 'absolute', left: 16 }} />
            </View>

            <View style={{ flexDirection: 'row', width: '100%', marginTop: 12, justifyContent:'space-evenly' }}>
                <TouchableOpacity
                    onPress={() => {
                        setStackIndex(1)
                    }}
                    style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}
                >
                    <Text style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setStackIndex(2)
                    }}
                    style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}>
                        Active
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setStackIndex(3)
                    }}
                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                        Archived
                    </Text>
                </TouchableOpacity>
            </View>

            <TicketListItem id="022" name="Lost ID" time="Since 2 days" status={false}/>
            <TicketListItem id="023" name="Material Error" time="Since 5 days" status={true} />

        </View>

    )
}

export default TicketStatus;

const styles = StyleSheet.create({
    unSelectedBox: {
        borderRadius: 8,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        flex:1
    },
    selectedBox: {
        borderRadius: 8,
        borderWidth: 1,
        flex:1,
        backgroundColor:COLORS.primary,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 8
    },
    unSelectedText: {
        fontFamily: FONTS.regular, color: COLORS.primary, fontSize: 14
    },
    selectedText: {
        fontFamily: FONTS.regular, color: 'white', fontSize: 14
    }

});

