import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, SafeAreaView, Modal, Pressable } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Feather, Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Lottie from 'lottie-react-native';

import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import ProgressBar from 'react-native-progress/Bar'
import { StackActions } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import Style from "../Home/Style";
import { Linking } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import { useCallback } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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





const LevelReviewZero = ({ navigation, route }) => {

    const [popup, setPopup] = useState(false)
    const [guidelines, setGuidelines] = useState({
        session: "",
        text: ""
    })

    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    function playAnimation() {
        setAnimSpeed(true)
    }


    function pauseAnimation() {
        setAnimSpeed(false)
    }

    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])

    const reviewMap = {
        1: "Needs Improvement",
        2: "Satisfied",
        3: "Good",
        4: "Excellent"
    }


    const [stackIndex, setStackIndex] = useState(1);
    const [fileResponse, setFileResponse] = useState({});
    const [fileResponse2, setFileResponse2] = useState({});

    const [stateID, setStateID] = useState(-1)
    const [states, setStates] = useState({})
    const [message, setMessage] = useState("")

    let _state;
    let _state2;
    let _state3;


    const [state, setState] = useState({})
    const [state2, setState2] = useState({})
    const [state3, setState3] = useState({})
    let data = route.params
    data.sessions = data.sessions.sort(function (a, b) { return (a.session_id > b.session_id) ? 1 : ((b.session_id > a.session_id) ? -1 : 0); });

    const [data2, setData] = useState(route.params)

    // useEffect( () => {
    //     console.log("1")
    //     let temp = data2.sessions.sort(function (a, b) { return (a.session_id > b.session_id) ? 1 : ((b.session_id > a.session_id) ? -1 : 0); });
    //     setData(current => ({ ...current, sessions: temp }))
    //     console.log(temp)
    // }, [data2])


    async function getTeacherID() {
        let value = await AsyncStorage.getItem('AuthState')
        setStateID(value)
    }



    async function fetchLevels(level_id, session_id, level_name) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://lte-backend.onrender.com/api/teacherapp/get/student/details',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { stud_id: route.params.student_id }
        };


        axios.request(config)
            .then((response) => {
                response.data.stud_total_and_completed_level_session_details.map((ele, index) => {
                    _state = { ..._state, [ele.level_id]: { total: Number(ele.total_session_count), completed: ele.completed_session_count, progress: Number(ele.total_session_count) / Number(ele.completed_session_count) == 0 ? 1 : Number(ele.completed_session_count) } }
                })

                response.data.stud_next_session.map((ele, index) => {
                    _state2 = { ..._state2, [ele.level_id]: { start: ele.start_time.substring(0, 5), end: ele.end_time.substring(0, 5), nextId: ele.session_id, nextTitle: ele.session_name, date: ele.date.substring(0, 10), day: ele.day } }
                })

                let temp0 = []
                let temp1 = []
                let temp2 = []
                let temp3 = []
                let temp4 = []
                let temp5 = []
                response.data.stud_level_details.map((ele, index) => {
                    if (ele.level_name.slice(-1) == "0") {
                        temp0.push(ele)
                    }
                    else if (ele.level_name.slice(-1) == "1") {
                        temp1.push(ele)
                    }
                    else if (ele.level_name.slice(-1) == "2") {
                        temp2.push(ele)
                    }
                    else if (ele.level_name.slice(-1) == "3") {
                        temp3.push(ele)
                    }
                    else if (ele.level_name.slice(-1) == "4") {
                        temp4.push(ele)
                    }
                    else if (ele.level_name.slice(-1) == "5") {
                        temp5.push(ele)
                    }

                })

                _state3 = {
                    0: temp0,
                    1: temp1,
                    2: temp2,
                    3: temp3,
                    4: temp4,
                    5: temp5,
                }
                let tempState = { ..._state[level_id], ..._state2[level_id], title: level_name, sessions: _state3[level_name.slice(-1)] }

                tempState.sessions = tempState.sessions.sort(function (a, b) { return (a.session_id > b.session_id) ? 1 : ((b.session_id > a.session_id) ? -1 : 0); });
                setData(tempState)
                setData(tempState)
            })
            .catch((error) => {
                console.log(error);
            });
    }



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTeacherID()
        });

        return unsubscribe;
    }, [navigation]);



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


    const audioSubmitBtn2 = useCallback(async () => {
        try {
            const response = await DocumentPicker.getDocumentAsync({
                type: "audio/*",
                copyToCacheDirectory: true,
                multiple: false,
            });
            setFileResponse2(response);
            setFormData2({ ...formData2, file: response.uri });
        } catch (err) {
            console.warn(err);
        }
    }, []);

    const date = new Date();

    const [formData, setFormData] = useState({
        api_key: "164615611795246",
        timestamp: date.getTime(),
        upload_preset: "student_upload",
        cloud_name: "db2bzxbn7"
    });

    const [formData2, setFormData2] = useState({
        api_key: "164615611795246",
        timestamp: date.getTime(),
        upload_preset: "student_upload",
        cloud_name: "db2bzxbn7"
    });


    const updateFeedback = async (levelId, id, level_name, index, name, guidelines) => {
        let prelevel_id = 0
        let presession_id = 0
        if (index > 0) {
            prelevel_id = data.sessions[index - 1].level_id
            presession_id = data.sessions[index - 1].session_id
        }

        let _data = JSON.stringify({
            'stud_id': route.params.student_id,
            'level_id': levelId,
            'session_id': id,
            'teacher_id': stateID,
            'presession_id': presession_id,
            'prelevel_id': prelevel_id,
            'session_feedback': reviewMap[stackIndex],
            'feedback_notes': message,
        });


        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${CONST.baseUrl}/teacherapp/update/student/sessionfeedback`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: _data
        };


        playAnimation()

        // if (index >= 1 && index < 12) {
        //     setGuidelines({
        //         session: name,
        //         text: guidelines
        //     })
        //     setPopup(true)
        // }

        axios.request(config)
            .then((response) => {
                pauseAnimation()
                Toast.show({
                    type: 'success',
                    text1: 'Successfully updated'
                })
                setStackIndex(1)
                setMessage("")
                if (index >= 1 && index < 12) {
                    setGuidelines({
                        session: name,
                        text: guidelines
                    })
                    setPopup(true)
                }
                fetchLevels(levelId, id, level_name)
            })
            .catch((error) => {
                pauseAnimation()
                console.log(error.response);
            });

    }




    const uploadAudio = async (id, levelId, level_name, index) => {

        const URL = `https://api.cloudinary.com/v1_1/db2bzxbn7/video/upload`;

        if (fileResponse.name === undefined || fileResponse2.name === undefined) {
            Toast.show({
                type: 'error',
                text1: 'Upload both audios to continue'
            })
            return
        }

        const { name, uri } = fileResponse;
        let formDataObj = new FormData();
        if (uri) {
            formDataObj.append('file', { name, uri, type: "video/mp4" });
            formDataObj.append('api_key', formData.api_key);
            formDataObj.append('upload_preset', formData.upload_preset);
            const salt = (Math.random() + 1).toString(36).substring(2)
            formDataObj.append('public_id', stateID + "-" + salt);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: URL,
                data: formDataObj,
                headers: { "Content-Type": "multipart/form-data" },
            };
            //TODO update student id 
            playAnimation()
            axios.request(config)
                .then((response) => {

                    axios.post(
                        `${CONST.baseUrl}/audio/student/upload`, {
                        student_id: route.params.student_id,
                        student_name: route.params.student_name,
                        audio_source: response.data.url ?? "",
                        level_id: levelId,
                        session_id: id,
                        audio_file_name: `Fahadh-${levelId}-${id}`,
                        audio_reason: "",
                        audio1: true,
                        audio2: false,
                        audio_uploaded_by: stateID,
                    }
                    ).then((response) => {
                        // console.log(response.status)
                        if (response.status == 200) {
                            uploadAudio2(id, levelId, level_name, index)
                            // setStates(current => ({ ...current, [id]: true }))
                            // updateFeedback(levelId, id, level_name, index)
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Failed uploading first audio'
                            })
                            pauseAnimation()
                        }

                    }
                    )
                }).catch((err => {
                    pauseAnimation()
                    console.error(err)
                    Toast.show({
                        type: 'error',
                        text1: 'Unknown error occured'
                    })
                }))


        }

    };

    const uploadAudio2 = async (id, levelId, level_name, index) => {

        const URL = `https://api.cloudinary.com/v1_1/db2bzxbn7/video/upload`;

        const { name, uri } = fileResponse2;
        let formDataObj = new FormData();
        if (uri) {
            formDataObj.append('file', { name, uri, type: "video/mp4" });
            formDataObj.append('api_key', formData2.api_key);
            formDataObj.append('upload_preset', formData2.upload_preset);
            const salt = (Math.random() + 1).toString(36).substring(2)
            formDataObj.append('public_id', stateID + "-" + salt);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: URL,
                data: formDataObj,
                headers: { "Content-Type": "multipart/form-data" },
            };
            //TODO update student id 
            playAnimation()
            axios.request(config)
                .then((response) => {

                    axios.post(
                        `${CONST.baseUrl}/audio/student/upload`, {
                        student_id: route.params.student_id,
                        student_name: route.params.student_name,
                        audio_source: response.data.url ?? "",
                        level_id: levelId,
                        session_id: id,
                        audio_file_name: `Fahadh-${levelId}-${id}`,
                        audio_reason: "",
                        audio1: false,
                        audio2: true,
                        audio_uploaded_by: stateID,
                    }
                    ).then((response) => {
                        console.log(response.status)
                        pauseAnimation()
                        if (response.status == 200) {
                            setStates(current => ({ ...current, [id]: true }))
                            Toast.show({
                                type: 'success',
                                text1: 'Success'
                            })
                            Toast.show({
                                type: 'error',
                                text1: 'Failed uploading second audio'
                            })
                            // updateFeedback(levelId, id, level_name, index)
                        }
                    }
                    )
                }).catch((err => {
                    pauseAnimation()
                    console.error(err)
                    Toast.show({
                        type: 'error',
                        text1: 'Unknown error occured'
                    })
                }))


        }

    };

    const feedbackMap = {
        "Needs Improvement": 1,
        "Satisfied": 2,
        "Good": 3,
        "Excellent": 4

    }

    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: 'white', paddingTop: 24 }}>
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


                        <ProgressBar unfilledColor={COLORS.unProgressed} color={data.progress == data.total ? COLORS.green : COLORS.yellow} progress={data.progress / data.total} width={Dimensions.get('window').width * 0.6} borderColor={COLORS.unProgressed} />
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
                            (ele.session_unlock_status === true) || data2.sessions[index].session_unlock_status || index == 0 ? (
                                <List.Accordion
                            
                                    onPress={() => { console.log(index) }}
                                   
                                    theme={{ colors: { primary: COLORS.primary } }} style={{ backgroundColor: 'white' }} title={ele.session_name} id={ele.session_id}
                                    right={props =>
                                        ele.session_feedback !== 'NA' ? (
                                            <List.Icon {...props} icon="check-circle-outline" color="green" />
                                        ) : (
                                            <List.Icon {...props} icon="clock" />
                                        )
                                    }                                >
                                    <View style={{ borderColor: COLORS.borderGrey, borderWidth: 1, }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ ...TrainStyle.sessionTitle, flex: 8, alignSelf:'center' }}>{ele.stud_res_desc}</Text>
                                        
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => openURI(ele.stud_res_url)}>
                                                <AntDesign name="folderopen" size={24} color="blue" />
                                            </TouchableOpacity>
                                        </View>


                                        {(ele.audio_file_count == null) ||
                                            states[ele.session_id] == true || (ele.audio1 === "approved" && ele.audio2 === "approved")
                                            ? <>
                                                <Text style={TrainStyle.subHeading}>Rate this session</Text>

                                                <ScrollView
                                                    horizontal={true}
                                                    showsVerticalScrollIndicator={false}
                                                    showsHorizontalScrollIndicator={false}
                                                    style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                                                    <TouchableOpacity
                                                        onPress={() => { if(ele.session_feedback === "NA")setStackIndex(1) }}
                                                        style={[ele.session_feedback === 'Needs Improvement' ? styles.selectedBox : stackIndex == 1 && ele.session_feedback === 'NA' ? styles.selectedBox : styles.unSelectedBox]}
                                                    >
                                                        <Text style={[ele.session_feedback === 'Needs Improvement' ? styles.selectedText : stackIndex == 1 && ele.session_feedback === 'NA' ? styles.selectedText : styles.unSelectedText]}>
                                                            Needs Improvement
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => { if(ele.session_feedback === "NA")setStackIndex(2) }}
                                                        style={[ele.session_feedback === 'Satisfied' ? styles.selectedBox : stackIndex == 2 && ele.session_feedback === 'NA'  ? styles.selectedBox : styles.unSelectedBox]}>
                                                        <Text style={[ele.session_feedback === 'Satisfied' ? styles.selectedText : stackIndex == 2 && ele.session_feedback === 'NA' ? styles.selectedText : styles.unSelectedText]}>
                                                            Satisfied
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => { if(ele.session_feedback === "NA")setStackIndex(3) }}
                                                        style={[ele.session_feedback === 'Good' ? styles.selectedBox : stackIndex == 3 && ele.session_feedback === 'NA' ? styles.selectedBox : styles.unSelectedBox]}>
                                                        <Text style={[ele.session_feedback === 'Good' ? styles.selectedText : stackIndex == 3 && ele.session_feedback === 'NA' ? styles.selectedText : styles.unSelectedText]}>
                                                            Good
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => { if(ele.session_feedback === "NA")setStackIndex(4) }}
                                                        style={[ele.session_feedback === 'Excellent' ? styles.selectedBox : stackIndex == 4 && ele.session_feedback === 'NA' ? styles.selectedBox : styles.unSelectedBox]}>
                                                        <Text style={[ele.session_feedback === 'Excellent' ? styles.selectedText : stackIndex == 4 && ele.session_feedback === 'NA' ? styles.selectedText : styles.unSelectedText]}>
                                                            Excellent
                                                        </Text>
                                                    </TouchableOpacity>
                                                </ScrollView>

                                                <TextInput multiline
                                                    maxLength={50}
                                                    textAlign='left'
                                                    onChangeText={message => {if(ele.feedback_notes === null)setMessage(message)}}
                                                    underlineColorAndroid='transparent'
                                                    returnKeyType="done"
                                                    blurOnSubmit={true}
                                                    fontSize={16}
                                                    value={ele.feedback_notes ?? message}
                                                    placeholder="Type Here" style={{ width: '90%', backgroundColor: COLORS.blueShade, marginTop: 20, padding: 8, height: 120, borderRadius: 8, width: '95%', alignSelf: 'center' }}>

                                                </TextInput>

                                                <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', marginTop: -20 }}>
                                                    {
                                                        ele.session_feedback == "NA" &&
                                                        <View style={{ ...Style.subViewContainer, width: '40%', marginHorizontal: 0 }}>
                                                            <TouchableOpacity
                                                                // onPress={()=>console.log("hii")}
                                                                onPress={() => { updateFeedback(ele.level_id, ele.session_id, ele.level_name, index, ele.session_name, ele.session_guidelines) }}
                                                                style={Style.btnStyle}>
                                                                <Text style={Style.btnTextStyle}>SUBMIT</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    }


                                                    {/* <View style={{ ...Style.subViewContainer, width: '40%', marginHorizontal: 0 }}>
                                                        <TouchableOpacity
                                                            style={Style.btnStyle}>
                                                            <Text style={Style.btnTextStyle}>RETAKE</Text>
                                                        </TouchableOpacity>
                                                    </View> */}
                                                </View>
                                            </> : <>
                                                <Text style={TrainStyle.subHeading}>Upload Audioa</Text>
                                                <View style={{ ...Style.dragViewContainer, paddingVertical: 8 }}>
                                                    <TouchableOpacity onPress={audioSubmitBtn}>
                                                        <Feather
                                                            style={Style.uploadIcon}
                                                            name="upload-cloud"
                                                            size={42}
                                                            color="blue"
                                                        />
                                                        <Text style={Style.uploadText}>
                                                            {ele.audio1 === "null" ? "Drop files here or click to upload" : ele.audio1}
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

                                                <View style={{ ...Style.dragViewContainer, paddingVertical: 8, marginTop: 24 }}>
                                                    <TouchableOpacity onPress={audioSubmitBtn2}>
                                                        <Feather
                                                            style={Style.uploadIcon}
                                                            name="upload-cloud"
                                                            size={42}
                                                            color="blue"
                                                        />
                                                        <Text style={Style.uploadText}>
                                                        {ele.audio2 === "null" ? "Drop files here or click to upload 2nd audio" : ele.audio2}
                                                        </Text>

                                                    </TouchableOpacity>
                                                    {fileResponse2.name != undefined ? (
                                                        <View style={{ flexDirection: 'row', marginTop: 24, alignItems: 'center' }}>
                                                            <Text>
                                                                {fileResponse2.name}
                                                            </Text>

                                                            <TouchableOpacity
                                                                onPress={() => { setFileResponse2({}) }}
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
                                                    <TouchableOpacity onPress={() => uploadAudio(ele.session_id, ele.level_id, ele.level_name, index)} style={Style.btnStyle}>
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
            {animSpeed &&
                <View style={{
                    shadowColor: COLORS.homeCard,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 8,
                    position: 'absolute', height: '120%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.0)', alignSelf: 'center', padding: 24, marginTop: 16
                }}>

                    <View style={{ width: '90%', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: '0%' }}>
                        <Lottie source={require('../../../../assets/loading.json')} autoPlay style={{ height: 300, width: 300, alignSelf: 'center' }} loop ref={animRef} speed={1} />
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: SIZES.large,
                                flexWrap: 'wrap',
                                marginTop: -48
                            }}>
                            Loading
                        </Text>
                    </View>

                </View>

            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={popup}
                onRequestClose={() => {
                    setPopup(!popup);
                }}
            >
                <View style={{
                    ...styles.modalView, top: '40%', width: '90%', borderRadius: 16, alignSelf: 'center', backgroundColor: 'white', paddingBottom: 20,
                    shadowColor: COLORS.homeCard,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 4
                }}>

                    <View style={{ backgroundColor: COLORS.blueShade, width: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>


                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.textBlack,
                                marginVertical: 14
                            }}
                        >{guidelines.session} Guidelines</Text>
                    </View>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.semiBold,
                            color: COLORS.textBlack,
                            marginTop: 8,
                            width: '100%'
                        }}
                    >{guidelines.text ?? "NA"}</Text>






                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 24 }}>

                        <Pressable
                            style={{ width: '45%', borderRadius: 6, borderWidth: 0, backgroundColor: COLORS.blue, padding: 6 }}
                            onPress={() => {
                                setPopup(!popup)
                            }
                            }
                        >
                            <Text style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: 'white',
                                textAlign: 'center'
                            }}>Close</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>

            <Toast
                position='bottom'
                bottomOffset={20}
            />
        </SafeAreaView>
    )
}

export default LevelReviewZero;


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
        marginHorizontal: 8,
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 0,
        alignSelf: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        top: '40%',
        width: '95%',
        paddingBottom: 20
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

});
