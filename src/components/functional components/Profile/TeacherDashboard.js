import { Text, View, Image } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { TextInput } from "@react-native-material/core";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons } from "@expo/vector-icons";

import { ScrollView } from "react-native-gesture-handler";
import { TimePickerModal } from 'react-native-paper-dates';
import { Switch } from 'react-native-paper';


const TeacherDashboard = ({route}) => {
    return(
        
        <View>
            {console.log(route.params)}
        </View>
    )
}


export default TeacherDashboard;