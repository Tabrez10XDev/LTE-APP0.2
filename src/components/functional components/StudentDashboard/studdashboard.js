import { Text, View, Image } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";

import PerformanceBottomSheet from "../../ui components/PerformanceBottomSheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import Training from "./Training";
import Availability from "./Availability";
import { TouchableOpacity } from "react-native-gesture-handler";


function StudentProfileView() {

  const refRBSheet = useRef();


  useEffect(() => {
    refRBSheet.current.open()
  }, [])

  const Tab = createMaterialTopTabNavigator();


  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>

      <Tab.Navigator screenOptions={{
        contentStyle: { backgroundColor: '#FFFFFF' }, tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
      }}>
        <Tab.Screen name="Training" component={Training} />
        <Tab.Screen name="Availability" component={Availability} />
      </Tab.Navigator>

      <TouchableOpacity style={{width:40, height:40, backgroundColor:COLORS.primary, position:'absolute', top:250, left:100, zIndex:800}}>

      </TouchableOpacity>

      <PerformanceBottomSheet refRBSheet={refRBSheet} />

    </View>
  );
}





export default StudentProfileView;
