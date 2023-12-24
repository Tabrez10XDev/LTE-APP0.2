import { Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { StackActions } from '@react-navigation/native';

import PerformanceBottomSheet from "../../ui components/PerformanceBottomSheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import Training from "./Training";
import Availability from "./Availability";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";


function StudentProfileView({ route, navigation }) {

  const refRBSheet = useRef();

  function openSheet() {
    refRBSheet.current.open()
  }

  async function lockSessions() {

    let yourDate = new Date()
    yourDate.toISOString().split('T')[0]

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'localhost:8080/api/teacherapp/lock/sessions',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        todayDate: yourDate 
      }
    };

    axios.request(config)
      .then((response) => {
        console.log("Lock Success");
      })
      .catch((error) => {
        console.log("Lock error");
      });
  }


  useEffect(() => {
    openSheet()
    lockSessions()
  }, [])

  const Tab = createMaterialTopTabNavigator();


  return (
    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white,', paddingTop:0 }}>

<View style={{ flexDirection: 'row', marginBottom:6 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.dispatch(StackActions.pop(1))
                    }}
                    style={{ marginTop: 8, marginStart: 8 }}>
                    <Ionicons name="arrow-back" size={32} color={COLORS.grey} style={{ }} />
                </TouchableOpacity>
               
            </View>
      <Tab.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' }, tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
        }}>
        <Tab.Screen name="Training" component={Training} initialParams={{ onClick: openSheet, student_id: route.params.student_id, student_name: route.params.student_name }} />
        <Tab.Screen name="Availability" component={Availability} initialParams={{student_id: route.params.student_id}}  />
      </Tab.Navigator>



      <PerformanceBottomSheet
        name={route.params.student_name}
        number={route.params.whatsappno}
        level={route.params.current_level_id}
        needsImprov={route.params.needs_improvement}
        satisfied={route.params.satisfied}
        good={route.params.good}
        excellent={route.params.excellent}
        session={route.params.current_session_id}
        group={route.params.group_name}
        refRBSheet={refRBSheet} />

    </SafeAreaView>
  );
}





export default StudentProfileView;
