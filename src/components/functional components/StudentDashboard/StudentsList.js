import { Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Style from "./StudDashboardStyle";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from "../../../../constants";
import { useState, useEffect, useRef } from "react";
import StudentListItem from "../../ui components/StudentListItem";


const StudentsList = ({navigation}) => {

    const [stackIndex, setStackIndex] = useState(1);

    function navToProfile(){
        navigation.navigate("Student Profile")
    }


    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%', padding: 16, alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center' }}>

                <TextInput placeholder="Search..." style={{ height: 60, width: '100%', borderRadius: 30, borderColor: COLORS.borderGrey, paddingHorizontal: 42, borderWidth: 1, alignItems: 'center', flexDirection: 'row' }} selectionColor={COLORS.grey}>

                </TextInput>
                <Ionicons name="md-search" size={22} color="#000000BD" style={{ position: 'absolute', left: 16 }} />
                <Ionicons name="ios-funnel" size={22} color="#000000BD" style={{ position: 'absolute', right: 16 }} />
            </View>

            <View style={{ flexDirection: 'row', width: '100%', marginTop: 12 }}>
                <TouchableOpacity
                    onPress={() => { setStackIndex(1) }}
                    style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}
                >
                    <Text style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setStackIndex(2) }}
                    style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}>
                        Active
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setStackIndex(3) }}
                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                        Archived
                    </Text>
                </TouchableOpacity>
            </View>

            <StudentListItem onclick={navToProfile}/>
            <StudentListItem/>
            <StudentListItem/>

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

