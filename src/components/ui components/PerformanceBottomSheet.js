import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { COLORS, SIZES, FONTS, assets } from "../../../constants";
import { StatusBar, TouchableOpacity } from "react-native";
import Style from "../functional components/StudentDashboard/StudDashboardStyle"
import StudPerformance from "../functional components/StudentDashboard/StudPerformance";
import { Ionicons } from '@expo/vector-icons';

import {
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
    Pressable
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";


export default PerformanceBottomSheet = ({ refRBSheet }) => {



    return (

        <RBSheet
            ref={refRBSheet}
            height={Dimensions.get("window").height * 0.75}
            openDuration={5}
            closeOnDragDown={true}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                container: {
                    borderTopStartRadius: 20,
                    borderTopEndRadius: 20,
                    backgroundColor: 'white',
                }
            }}
        >

            <View>
                <View style={Style.studMainContainer}>
                    <Text style={Style.nameTextStyle}>Vikram Kumar</Text>
                    <Text style={[Style.gradeText, Style.subTextStyle]}>+91 9087654321</Text>
                    <Text style={Style.moreText}>More</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                        <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.smallFont }}>
                            Level 2
                        </Text>
                        <View style={{ flexDirection: 'row', marginStart: 8 }}>
                            <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.grey, marginHorizontal: 2 }} />
                            <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.grey, marginHorizontal: 2 }} />
                            <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.grey, marginHorizontal: 2 }} />

                        </View>
                    </View>
                </View>

                <View style={{ paddingVertical: 16 }}>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style={{ ...Style.completionAlign, width: '50%' }}>
                            <Text style={[Style.textStyle, Style.completedText]}>04</Text>
                            <Text style={Style.subTextStyle}>Needs Improvement</Text>
                        </View>

                        <View style={{ ...Style.completionAlign, width: '50%' }}>
                            <Text style={[Style.textStyle, Style.studyingText]}>06</Text>
                            <Text style={Style.subTextStyle}>Satisfactory</Text>
                        </View>
                    </View>
                    {/* <Ionicons name="md-school" size={50} color="#FF758F" style={{alignSelf:'center', position:'absolute', top:'50%'}} /> */}

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 64 }}>
                        <View style={{ ...Style.completionAlign, width: '50%' }}>
                            <Text style={[Style.textStyle, Style.goodText]}>07</Text>
                            <Text style={Style.subTextStyle}>Good</Text>
                        </View>

                        <View style={{ ...Style.completionAlign, width: '50%' }}>
                            <Text style={[Style.textStyle, Style.excellentText]}>10</Text>
                            <Text style={Style.subTextStyle}>Excellent</Text>
                        </View>
                    </View>

                </View>

                <View style={Style.subViewContainer}>
                    <TouchableOpacity onPress={()=>{ refRBSheet.current.close()}} style={Style.btnStyle}>
                        <Text style={Style.btnTextStyle}>Close</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={Style.mainContainer}>
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
</View> */}
                {/* <StudPerformance/> */}
            </View>



        </RBSheet>

    )
}

