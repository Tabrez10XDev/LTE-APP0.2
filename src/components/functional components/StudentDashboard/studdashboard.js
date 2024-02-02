import { Text, View, Image, SafeAreaView, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { StackActions } from '@react-navigation/native';

import PerformanceBottomSheet from "../../ui components/PerformanceBottomSheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import Training from "./Training";
import Availability from "./Availability";
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
    // lockSessions()
  }, [])

  const Tab = createMaterialTopTabNavigator();


  return (
    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white,', paddingTop: 0 }}>

      <View style={{ flexDirection: 'row', marginBottom: 6, alignItems:'center', justifyContent:'center', width:'100%' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(StackActions.pop(1))
          }}
          style={{ marginTop: Platform.OS === "ios" ? 8 : 28, position:'absolute', left:12 }}>
          <Ionicons name="arrow-back" size={32} color={COLORS.grey} style={{}} />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.medium,
            flexWrap: 'wrap',
          }}>
            {route.params.student_name}
        </Text>

      </View>
      <Tab.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' }, tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
        }}>
        <Tab.Screen name="Training" component={Training} initialParams={{ onClick: openSheet, student_id: route.params.student_id, student_name: route.params.student_name }} />
        <Tab.Screen name="Availability" component={Availability} initialParams={{ student_id: route.params.student_id }} />
      </Tab.Navigator>


{console.log(route.params, "stats")}

      <PerformanceBottomSheet
        name={route.params.student_name}
        number={route.params.whatsappno}
        level={route.params?.current_level_name?.at(-1)}
        needsImprov={route.params.needs_improvement}
        satisfied={route.params.satisfied}
        good={route.params.good}
        excellent={route.params.excellent}
        session={route.params?.current_session_name?.replace(/\D/g, '')}
        group={route.params.group_name}
        refRBSheet={refRBSheet} />

    </SafeAreaView>
  );
}





export default StudentProfileView;
