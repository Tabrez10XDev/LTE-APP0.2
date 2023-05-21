import { Text, View, Image } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";

import PerformanceBottomSheet from "../../ui components/PerformanceBottomSheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import Training from "./Training";
import Availability from "./Availability";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";



function StudentProfileView({route}) {

  const refRBSheet = useRef();

  function openSheet(){
    refRBSheet.current.open()
  }


  useEffect(() => {
    openSheet()
  }, [])

  const Tab = createMaterialTopTabNavigator();


  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

      <Tab.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' }, tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
        }}>
        <Tab.Screen name="Training" component={Training} initialParams={{onClick: openSheet}} />
        <Tab.Screen name="Availability" component={Availability} />
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

    </View>
  );
}





export default StudentProfileView;
