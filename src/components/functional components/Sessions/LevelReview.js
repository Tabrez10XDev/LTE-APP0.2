import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Feather, Ionicons } from "@expo/vector-icons";

import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import ProgressBar from 'react-native-progress/Bar'
import { StackActions } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import Style from "../Home/Style";


const viewClicked = () => {
    console.log("view button clicked");
};
const downloadClicked = () => {
    console.log("download button clicked");
};
const submitBtn = () => {
    console.log("submit the rating clicked");
};


const LevelReview = ({ navigation }) => {

    const [stackIndex, setStackIndex] = useState(1);


    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {

                        navigation.dispatch(StackActions.pop(1))
                    }}
                    style={{ marginTop: 8, marginStart: 8 }}>
                    <Ionicons name="arrow-back" size={32} color={COLORS.grey} style={{ marginEnd: 16 }} />
                </TouchableOpacity>
                <View
                    style={{ marginHorizontal: 8, marginTop: 12, borderBottomWidth: 1, borderColor: COLORS.borderGrey, paddingBottom: 8, width: '90%' }}>
                    <Text
                        style={{
                            fontFamily: FONTS.bold,
                            fontSize: SIZES.large,
                            flexWrap: 'wrap',
                        }}>
                        Level 1
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.semiBold,
                            fontSize: SIZES.smallFont,
                            flexWrap: 'wrap',
                        }}>
                        Mon : 4-5 PM, Wed : 4-5 PM, Fri : 4-5PM
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZES.smallFont,
                                color: COLORS.grey
                            }}>
                            Next session on 12/04/21
                        </Text>


                    </View>
                    <View style={{ alignSelf: 'flex-start', marginTop: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>


                        <ProgressBar unfilledColor={COLORS.unProgressed} color={COLORS.yellow} progress={0.6} width={Dimensions.get('window').width * 0.6} borderColor={COLORS.unProgressed} />
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZES.smallFont,
                                color: COLORS.darkBlue,
                                marginStart: 8
                            }}>
                            17 of 24
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <List.AccordionGroup>

                    <List.Accordion theme={{ colors: { primary: COLORS.primary } }} style={{backgroundColor:'white'}} title="Level 1" id="5">
                        <View style={{ borderColor: COLORS.borderGrey, borderWidth: 1 }}>
                            <Text style={TrainStyle.sessionTitle}>Basic English Concepts</Text>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.smallFont, marginHorizontal: 16 }}>
                                We shall use it in one of these narrower senses, embracing syntax and morphology. Syntax is concerned with the way words combine to form sentences, while morphology is concerned with the form of words
                            </Text>
                            <View style={TrainStyle.btnContainer}>
                                <TouchableOpacity style={TrainStyle.btnStyle} onPress={viewClicked}>
                                    <Text style={TrainStyle.btnTextStyle}>View</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={TrainStyle.btnStyle}
                                    onPress={downloadClicked}
                                >
                                    <Text style={TrainStyle.btnTextStyle}>Download</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={TrainStyle.subHeading}>Rate this session</Text>

                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                                <TouchableOpacity
                                    onPress={() => { setStackIndex(1) }}
                                    style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}
                                >
                                    <Text style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}>
                                        Needs Improvement
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setStackIndex(2) }}
                                    style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                                    <Text style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}>
                                        Satisfactory
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setStackIndex(3) }}
                                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                                        Good
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setStackIndex(3) }}
                                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                                        Excellent
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>

                            <View style={{ ...Style.subViewContainer }}>
                                <TouchableOpacity style={Style.btnStyle}>
                                    <Text style={Style.btnTextStyle}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </List.Accordion>





                    <List.Accordion theme={{ colors: { primary: COLORS.primary } }} style={{backgroundColor:'white'}} title="Level 2" id="2">
                        <View style={{ borderColor: COLORS.borderGrey, borderWidth: 1 }}>
                            <Text style={TrainStyle.sessionTitle}>Basic English Concepts</Text>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.smallFont, marginHorizontal: 16 }}>
                                We shall use it in one of these narrower senses, embracing syntax and morphology. Syntax is concerned with the way words combine to form sentences, while morphology is concerned with the form of words
                            </Text>
                            <View style={TrainStyle.btnContainer}>
                                <TouchableOpacity style={TrainStyle.btnStyle} onPress={viewClicked}>
                                    <Text style={TrainStyle.btnTextStyle}>View</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={TrainStyle.btnStyle}
                                    onPress={downloadClicked}
                                >
                                    <Text style={TrainStyle.btnTextStyle}>Download</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={TrainStyle.subHeading}>Rate this session</Text>

                            <ScrollView
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                                <TouchableOpacity
                                    onPress={() => { setStackIndex(1) }}
                                    style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}
                                >
                                    <Text style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}>
                                        Needs Improvement
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setStackIndex(2) }}
                                    style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                                    <Text style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}>
                                        Satisfactory
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setStackIndex(3) }}
                                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                                        Good
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setStackIndex(3) }}
                                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                                        Excellent
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>

                            <View style={{ ...Style.subViewContainer }}>
                                <TouchableOpacity style={Style.btnStyle}>
                                    <Text style={Style.btnTextStyle}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </List.Accordion>



                </List.AccordionGroup>
            </ScrollView>


        </SafeAreaView>
    )
}

export default LevelReview;


const styles = StyleSheet.create({
    unSelectedBox: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        marginHorizontal: 8
    },
    selectedBox: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        marginHorizontal: 8
    },
    unSelectedText: {
        fontFamily: FONTS.regular, color: COLORS.darkGrey, fontSize: 14
    },
    selectedText: {
        fontFamily: FONTS.regular, color: 'white', fontSize: 14
    }

});


const TrainStyle = StyleSheet.create({
    btnContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        marginHorizontal: 16
    },
    chipContainer: {
        flex: 2,
        flexDirection: "row",
    },
    submitContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    chipFirstItem: {
        width: 300,
        height: 30,
        fontSize: 2,
        borderRadius: 25,
    },
    chipItem: {
        width: 100,
        height: 30,
        fontSize: 2,
        borderRadius: 25,
        alignContent: "center",
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
        marginTop: 10,
        marginRight: 10,
    },
    sessionTitle: {
        margin: 16,
        fontSize: 20,
        fontWeight: "bold",
    },
    btnStyle: {
        alignItems: "center",
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#FF758F",
        width: '40%',
        height: 40,
    },
    addMargin: {
        marginTop: 100,
    },
    subHeading: {
        marginTop: 16,
        marginHorizontal: 16,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20,
    },
    btnTextStyle: {
        fontSize: 15,
        color: "#FF758F",
    },
});