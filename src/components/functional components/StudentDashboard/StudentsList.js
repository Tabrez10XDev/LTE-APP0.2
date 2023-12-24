import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Style from "./StudDashboardStyle";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, CONST } from "../../../../constants";
import { useState, useEffect, useRef } from "react";
import StudentListItem from "../../ui components/StudentListItem";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentsList = ({ navigation, route }) => {

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
            console.log(teacherID)
            axios.post(
                `${CONST.baseUrl}/teacherapp/get/student/training`, {
                teacher_id: teacherID
            }
            ).then((response) => {
                console.log(response.data);
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
            }).catch((err)=>{
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
                <Ionicons name="md-search" size={22} color="#000000BD" style={{ position: 'absolute', left: 16 }} />
                <Ionicons name="ios-funnel" size={22} color="#000000BD" style={{ position: 'absolute', right: 16 }} />
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
                        Archived
                    </Text>
                </TouchableOpacity>
            </View>
            {studentData.length == 0 ? 
            <Text style={{marginTop:64, fontFamily: FONTS.bold, color:COLORS.darkGrey, fontSize: 16}}>
                No Student is mapped to you 
            </Text> : null}
            {studentData.map((ele, index) => {
                return (
                    <StudentListItem
                        name={ele.student_name}
                        education={ele.education}
                        number={ele.whatsappno}
                        onclick={() => {
                            navigation.navigate("Student Profile",ele)
                        }}
                        key={index} />
                )
            })}


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

