import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";

import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import ProgressBar from 'react-native-progress/Bar'

const viewClicked = () => {
    console.log("view button clicked");
};
const downloadClicked = () => {
    console.log("download button clicked");
};
const submitBtn = () => {
    console.log("submit the rating clicked");
};



const Training = ({ navigation }) => {


    function navToSessions() {
        navigation.navigate("Level Review")
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'white', paddingTop: 16 }}>
            <List.AccordionGroup>
                <List.Accordion theme={{ colors: { primary: COLORS.primary } }} style={{ backgroundColor: 'white', borderBottomWidth: 1, borderColor: COLORS.borderGrey }} title="Level 1" id="1">
                    <TouchableOpacity
                        onPress={navToSessions}
                        style={{ marginHorizontal: 16, marginTop: 12, borderBottomWidth: 1, borderColor: COLORS.borderGrey, paddingBottom: 8, width: '90%' }}>
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
                        <View style={{ alignSelf: 'flex-start', marginTop: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>


                            <ProgressBar unfilledColor={COLORS.unProgressed} color={COLORS.yellow} progress={0.3} width={Dimensions.get('window').width * 0.7} borderColor={COLORS.unProgressed} />
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZES.smallFont,
                                    color: COLORS.darkBlue,
                                    marginStart: 8
                                }}>
                                7 of 24
                            </Text>
                        </View>
                    </TouchableOpacity>
                </List.Accordion>


                <List.Accordion theme={{ colors: { primary: COLORS.primary } }} style={{ backgroundColor: 'white', borderBottomWidth: 1, borderColor: COLORS.borderGrey }} title="Level 2" id="2">
                    <TouchableOpacity
                        onPress={navToSessions}
                        style={{ marginHorizontal: 16, marginTop: 12, borderBottomWidth: 1, borderColor: COLORS.borderGrey, paddingBottom: 8, width: '90%' }}>
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
                        <View style={{ alignSelf: 'flex-start', marginTop: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>


                            <ProgressBar unfilledColor={COLORS.unProgressed} color={COLORS.green} progress={1} width={Dimensions.get('window').width * 0.7} borderColor={COLORS.unProgressed} />
                            <Text
                                style={{
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZES.smallFont,
                                    color: COLORS.darkBlue,
                                    marginStart: 8
                                }}>
                                24 of 24
                            </Text>
                        </View>
                    </TouchableOpacity>
                </List.Accordion>
            </List.AccordionGroup>
        </View>
    )
}

export default Training;

const TrainStyle = StyleSheet.create({
    btnContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
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
        margin: 10,
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
        width: 100,
        height: 40,
    },
    addMargin: {
        marginTop: 100,
    },
    subHeading: {
        marginTop: 60,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 20,
    },
    btnTextStyle: {
        fontSize: 15,
        color: "#FF758F",
    },
});