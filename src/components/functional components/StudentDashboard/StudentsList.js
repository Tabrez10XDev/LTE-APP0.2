import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Style from "./StudDashboardStyle";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, CONST } from "../../../../constants";
import { useState, useEffect, useRef } from "react";
import StudentListItem from "../../ui components/StudentListItem";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';

const StudentsList = ({ navigation, route }) => {



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

    const [students, setStudents] = useState([])
    const [activeStudents, setActiveStudents] = useState([])
    const [archiveStudents, setArchiveStudents] = useState([])
    const [stackIndex, setStackIndex] = useState(1);
    const [studentData, setStudentData] = useState([])



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getStudentList()
        });

        return unsubscribe;
    }, [navigation]);


    const getStudentList = async () => {
        let teacherID = await AsyncStorage.getItem('AuthState')
        playAnimation()
        axios.post(
            `${CONST.baseUrl}/teacherapp/get/student/training`, {
            teacher_id: teacherID
        }
        ).then((response) => {
            pauseAnimation()
            setStudents(response.data)
            setStudentData(response.data)
            setActiveStudents([])
            response.data.map((ele, index) => {
                if (ele.student_status == "active") {
                    setActiveStudents(oldArray => [...oldArray, ele]);
                } else {
                    setArchiveStudents(oldArray => [...oldArray, ele]);
                }
            })
        }).catch((err) => {
            pauseAnimation()
            console.log(err.response.data);
        })

    }

    function handleSearch(text) {
        let tempArray = []
        if (text.trim() != "") {
            studentData.map((ele) => {
                if (ele.student_name.includes(text)) {
                    tempArray.push(ele)
                }
            })
            setStudentData(tempArray)
        } else {
            if (stackIndex == 1) {
                setStudentData(students)
            } else if (stackIndex == 2) {
                setStudentData(activeStudents)
            } else {
                setStudentData(archiveStudents)
            }
        }
    }




    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: 16, alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center' }}>

                <TextInput onChangeText={(text) => handleSearch(text)} placeholder="Search..." style={{ height: 60, width: '100%', borderRadius: 30, borderColor: COLORS.borderGrey, paddingHorizontal: 42, borderWidth: 1, alignItems: 'center', flexDirection: 'row' }} selectionColor={COLORS.grey}>

                </TextInput>
                <Ionicons name="search" size={22} color="#000000BD" style={{ position: 'absolute', left: 16 }} />
                <Ionicons name="funnel" size={22} color="#000000BD" style={{ position: 'absolute', right: 16 }} />
            </View>

            <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(students);
                        setStudentData(students)
                        setStackIndex(1)
                    }}
                    style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}
                >
                    <Text style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setStudentData(activeStudents)
                        setStackIndex(2)
                    }}
                    style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}>
                        Active
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setStudentData(archiveStudents)
                        setStackIndex(3)
                    }}
                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                        Completed
                    </Text>
                </TouchableOpacity>
            </View>

            {
                studentData.length == 0 && !animSpeed &&
                <Text style={{ marginTop: 64, fontFamily: FONTS.bold, color: COLORS.darkGrey, fontSize: 16 }}>
                    No Student is mapped to you
                </Text>
            }

            {
                studentData.sort((a, b) => a.student_name.localeCompare(b.student_name)).map((ele, index) => {
                    return (
                        <StudentListItem
                            name={ele.student_name}
                            education={ele.education}
                            number={ele.whatsappno}
                            onclick={() => {
                                navigation.navigate("Student Profile", ele)
                            }}
                            key={index} />
                    )
                })}



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
                    position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.0)', alignSelf: 'center', padding: 24, marginTop: 16
                }}>

                    <View style={{ marginTop: '-40%' }}>
                        <Lottie source={require('../../../../assets/loading.json')} autoPlay style={{ height: 300, width: 300, alignSelf: 'center' }} loop ref={animRef} speed={1} />
                        <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: SIZES.large,
                                flexWrap: 'wrap',
                                marginTop: -48
                            }}>
                        </Text>
                    </View>

                </View>

            }
        </View>
    )
}

export default StudentsList;


const styles = StyleSheet.create({
    unSelectedBox: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.borderGrey,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        marginHorizontal: 8
    },
    selectedBox: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.primary,
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
        fontFamily: FONTS.regular, color: COLORS.primary, fontSize: 14
    }

});

