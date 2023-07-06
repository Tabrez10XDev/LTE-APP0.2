import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Feather, Ionicons, Entypo } from "@expo/vector-icons";

import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import ProgressBar from 'react-native-progress/Bar'
import { StackActions } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import Style from "../Home/Style";
import { Linking } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import { useCallback } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";


const openURI = async (url) => {
    if (url.trim() == "") {
        Toast.show({
            type: 'error',
            text1: 'No Data'
        })
        return
    }
    const supported = await Linking.canOpenURL(url); //To check if URL is supported or not.
    if (supported) {
        await Linking.openURL(url); // It will open the URL on browser.
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
}


const viewClicked = (link) => {

    console.log("view button clicked");
};
const downloadClicked = () => {
    console.log("download button clicked");
};
const submitBtn = () => {
    console.log("submit the rating clicked");
};


const LevelReview = ({ navigation, route }) => {

    const [stackIndex, setStackIndex] = useState(1);
    const [fileResponse, setFileResponse] = useState({});

    let data = route.params
    data.sessions = data.sessions.sort(function (a, b) { return (a.session_id > b.session_id) ? 1 : ((b.session_id > a.session_id) ? -1 : 0); });



    const audioSubmitBtn = useCallback(async () => {
        try {
            const response = await DocumentPicker.getDocumentAsync({
                type: "audio/*",
                copyToCacheDirectory: true,
                multiple: false,
            });
            setFileResponse(response);
            setFormData({ ...formData, file: response.uri });
        } catch (err) {
            console.warn(err);
        }
    }, []);

    const date = new Date();

    const [formData, setFormData] = useState({
        api_key: "164615611795246",
        timestamp: date.getTime(),
        upload_preset: "my_preset",
        cloud_name: "db2bzxbn7"
    });


    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: 'white', paddingTop: 24 }}>
            {console.log(route.params.sessions)}
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
                        {data.title}
                    </Text>
                    <Text
                        style={{
                            fontFamily: FONTS.semiBold,
                            fontSize: SIZES.smallFont,
                            flexWrap: 'wrap',
                        }}>
                        {data.nextTitle} {" "} {data.start}  {"- "} {data.end}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZES.smallFont,
                                color: COLORS.grey
                            }}>
                            Next session on {data.date} {" "} {data.day}
                        </Text>


                    </View>
                    <View style={{ alignSelf: 'flex-start', marginTop: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>


                        <ProgressBar unfilledColor={COLORS.unProgressed} color={COLORS.yellow} progress={data.progress} width={Dimensions.get('window').width * 0.6} borderColor={COLORS.unProgressed} />
                        <Text
                            style={{
                                fontFamily: FONTS.regular,
                                fontSize: SIZES.smallFont,
                                color: COLORS.darkBlue,
                                marginStart: 8
                            }}>
                            {data.completed} of {data.total}
                        </Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <List.AccordionGroup>

                    {data.sessions.map((ele, index) => {
                        return (
                            ele.session_unlock_status === true ? (
                                <List.Accordion theme={{ colors: { primary: COLORS.primary } }} style={{ backgroundColor: 'white' }} title={ele.session_name} id={ele.session_id}>
                                    <View style={{ borderColor: COLORS.borderGrey, borderWidth: 1 }}>
                                        <Text style={TrainStyle.sessionTitle}>{ele.stud_res_name}</Text>
                                        <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.smallFont, marginHorizontal: 16 }}>
                                            {ele.stud_res_desc}
                                        </Text>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableOpacity style={TrainStyle.btnStyle} onPress={() => openURI(ele.stud_res_url)}>
                                                <Text style={TrainStyle.btnTextStyle}>View</Text>
                                            </TouchableOpacity>

                                        </View>
                                        {(ele.session_name != "session1" && ele.audio_file_count == null) ||
                                            (ele.session_name != "session30" && ele.audio_file_count == null) ||
                                            (ele.session_name != "session50" && ele.audio_file_count == null)
                                            ? <>
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
                                                        onPress={() => { setStackIndex(4) }}
                                                        style={[stackIndex == 4 ? styles.selectedBox : styles.unSelectedBox]}>
                                                        <Text style={[stackIndex == 4 ? styles.selectedText : styles.unSelectedText]}>
                                                            Excellent
                                                        </Text>
                                                    </TouchableOpacity>
                                                </ScrollView>

                                                {
                                                    ele.session_feedback == "NA" &&

                                                    <View style={{ ...Style.subViewContainer }}>
                                                        <TouchableOpacity style={Style.btnStyle}>
                                                            <Text style={Style.btnTextStyle}>SUBMIT</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                }

                                            </> : <>
                                                <Text style={TrainStyle.subHeading}>Upload Audio</Text>
                                                <View style={{ ...Style.dragViewContainer, paddingVertical: 8 }}>
                                                    <TouchableOpacity onPress={audioSubmitBtn}>
                                                        <Feather
                                                            style={Style.uploadIcon}
                                                            name="upload-cloud"
                                                            size={42}
                                                            color="blue"
                                                        />
                                                        <Text style={Style.uploadText}>
                                                            Drop files here or click to upload
                                                        </Text>

                                                    </TouchableOpacity>
                                                    {fileResponse.name != undefined ? (
                                                        <View style={{ flexDirection: 'row', marginTop: 24, alignItems: 'center' }}>
                                                            <Text>
                                                                {fileResponse.name}
                                                            </Text>

                                                            <TouchableOpacity
                                                                onPress={() => { setFileResponse({}) }}
                                                                style={{ marginLeft: 8, alignItems: 'center', justifyContent: 'center' }}>

                                                                <Feather
                                                                    style={{}}
                                                                    name="x"
                                                                    size={24}
                                                                    color="black"
                                                                />
                                                            </TouchableOpacity>

                                                        </View>

                                                    ) : null}
                                                </View>
                                                <View style={{ ...Style.subViewContainer }}>
                                                    <TouchableOpacity style={Style.btnStyle}>
                                                        <Text style={Style.btnTextStyle}>SUBMIT</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </>}
                                    </View>
                                </List.Accordion>
                            ) : (
                                <View style={{ height: 45, borderRadius: 4, backgroundColor: "#f5f5f5", alignItems: 'center', flexDirection: 'row', width: '95%', alignSelf: 'center', paddingHorizontal: 10, marginBottom: 8, justifyContent: 'space-between' }}>
                                    <Text>
                                        {ele.session_name}
                                    </Text>
                                    <Entypo name="lock" size={24} color="black" />
                                </View>
                            ))
                    })}

                </List.AccordionGroup>
            </ScrollView>

            <Toast
                position='bottom'
                bottomOffset={20}
            />
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