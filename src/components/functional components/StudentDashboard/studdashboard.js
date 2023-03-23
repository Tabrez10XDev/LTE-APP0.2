import { Text, View, Image } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";

import Style from "./StudDashboardStyle";
import { Ionicons } from '@expo/vector-icons';
import StudPerformance from "./StudPerformance";
import PerformanceBottomSheet from "../../ui components/PerformanceBottomSheet";


function StudentProfileView() {

  const refRBSheet = useRef();


  useEffect(() => {
    refRBSheet.current.open()
  }, [])


  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
      <PerformanceBottomSheet refRBSheet={refRBSheet} />

    </View>
  );
}





export default StudentProfileView;
