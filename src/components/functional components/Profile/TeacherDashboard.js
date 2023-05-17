import { Text, View, Image } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons } from "@expo/vector-icons";

import { ScrollView } from "react-native-gesture-handler";
import { TimePickerModal } from 'react-native-paper-dates';
import { Switch } from 'react-native-paper';
import { createContext, useContext } from 'react';
import { TextInput } from "@react-native-material/core";


const TeacherDashboard = ({ route }) => {

    const data = route.params

    return (

        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', width: Dimensions.get('window').width, justifyContent: 'center' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

                <TextInput value={data.teacher_name} variant="outlined" label="Teacher Name" style={{ marginHorizontal: 16, width: '90%', marginTop: 24 }} color={COLORS.darkGrey} editable={false} />
                <TextInput value={data.contactno} variant="outlined" label="Contact No." style={{ marginHorizontal: 16, width: '90%', marginTop: 24 }} color={COLORS.darkGrey} editable={false} />
                <TextInput value={data.email} variant="outlined" label="Email" style={{ marginHorizontal: 16, width: '90%', marginTop: 24 }} color={COLORS.darkGrey} editable={false} />
                <TextInput value={data.role} variant="outlined" label="Role" style={{ marginHorizontal: 16, width: '90%', marginTop: 24 }} color={COLORS.darkGrey} editable={false} />
                <TextInput value={data.teacher_id.toString()} variant="outlined" label="Teacher ID" style={{ marginHorizontal: 16, width: '90%', marginTop: 24 }} color={COLORS.darkGrey} editable={false} />
                <TextInput value={data.spoc_name} variant="outlined" label="SPOC Name" style={{ marginHorizontal: 16, width: '90%', marginTop: 24 }} color={COLORS.darkGrey} editable={false} />
                <TextInput value={data.city} variant="outlined" label="City" style={{ marginHorizontal: 16, width: '90%', marginTop: 24 }} color={COLORS.darkGrey} editable={false} />
            </ScrollView>

        </View>
    )
}


export default TeacherDashboard;