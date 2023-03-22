import { Text, View, Image } from "react-native";
import React from "react";
import Style from "./StudDashboardStyle";
import { Ionicons } from '@expo/vector-icons';
import StudPerformance from "./StudPerformance";


function StudentProfileView() {
  return (
    <View>
      <View style={Style.studMainContainer}>
        <Text style={Style.nameTextStyle}>Vikram Kumar</Text>
        <Text style={[Style.gradeText, Style.subTextStyle]}>+91 9087654321</Text>
        <Text style={Style.moreText}>More</Text>
      </View>
      <View style={Style.mainContainer}>
      <View style={Style.completionAlign}>
        <Text style={[Style.textStyle , Style.completedText]}>01</Text>
        <Text style={Style.subTextStyle}>Completed</Text>
      </View>
      <View style={Style.completionAlign}>
      <Ionicons name="md-school" size={42} color="#FF758F" />
      </View>
      <View style={Style.completionAlign}>
      <Text style={[Style.textStyle , Style.studyingText]}>02</Text>
        <Text style={Style.subTextStyle}>Studying</Text>
      </View>
      </View>
      <StudPerformance/>
    </View>
  );
}





export default StudentProfileView;
