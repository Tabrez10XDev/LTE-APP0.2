import { Text, View, Image, SafeAreaView, Platform, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { StackActions } from '@react-navigation/native';

import PerformanceBottomSheet from "../../ui components/PerformanceBottomSheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import Training from "./Training";
import Availability from "./Availability";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";


function StudentProfileView({ route, navigation }) {

  const refRBSheet = useRef();

  const [state, setState] = useState({})

  function openSheet() {
    refRBSheet.current.open()
  }



  async function fetchStats() {
    axios.post(
      `${CONST.baseUrl}/teacherapp/get/student/sessionfeedbackcount`, {
      student_id: route.params.student_id
    }
    ).then((res)=>{
          setState(res.data)
    }).catch((err)=>{
      console.error(err.response.data);
    })
  }

  useEffect(async () => {
   await fetchStats()
    openSheet()

    // lockSessions()
  }, [])

  const Tab = createMaterialTopTabNavigator();


  return (
    <SafeAreaView style={{ height: '100%', width: '100%', backgroundColor: 'white,', paddingTop: 0 }}>

      <View style={{ flexDirection: 'row', marginBottom: 6, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(StackActions.pop(1))
          }}
          style={{ marginTop: Platform.OS === "ios" ? 8 : 28, position: 'absolute', left: 12 }}>
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
        <Tab.Screen name="Training" component={Training} initialParams={{ onClick: async ()=>{
          await fetchStats()
          openSheet()
          
        }, student_id: route.params.student_id, student_name: route.params.student_name }} />
        <Tab.Screen name="Availability" component={Availability} initialParams={{ student_id: route.params.student_id }} />
      </Tab.Navigator>



      <PerformanceBottomSheet
        name={route.params.student_name}
        number={route.params.whatsappno}
        level={state.level_name ?? ""}
        needsImprov={state.needs_improvement ?? 0}
        satisfied={state.satisfied ?? 0}
        good={state.good ?? 0}
        excellent={state.excellent ?? 0}
        session={state.session_name ?? ""}
        group={route.params.group_name}
        refRBSheet={refRBSheet} />

    </SafeAreaView>
  );
}





export default StudentProfileView;
