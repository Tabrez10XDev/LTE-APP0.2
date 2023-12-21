import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { TextInput } from "@react-native-material/core";
import axios from 'axios'

import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

import { ScrollView } from "react-native-gesture-handler";
import { TimePickerModal } from 'react-native-paper-dates';
import { Switch } from 'react-native-paper';

const Availability = ({ navigation, route }) => {

    const [date, setDate] = useState()

    const [temp, setTemp] = useState()
    const [open, setOpen] = React.useState(false);

    const [temp2, setTemp2] = useState()
    const [open2, setOpen2] = React.useState(false);
    const [data, setData] = useState({
        next_level_name: "",
        next_level_session_count: "21"
    })

    const [totalDays, setTotalDays] = useState(0)
    const [currentTimeIndex, setCurrentTimeIndex] = useState(0)

    async function fetchAvailability() {

        axios.get(`${CONST.baseUrl}/student/assign/next/session/${route.params.student_id}`)
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }

    async function postAvailability() {


        if (temp == null || temp == undefined) {
            Toast.show({
                type: 'info',
                text1: "Please select start date"
            })
            return
        }

        const trueSwitches = [];
        if (totalDays !== 3) {
            Toast.show({
                type: 'info',
                text1: "Please choose 3 days only"
            })
            return
        }

        for (const key in switches) {
            if (switches[key] === true) {
                trueSwitches.push({
                    day: (parseInt(key) + 1).toString(),
                    start_time: time[parseInt(key)],
                    end_time: time2[parseInt(key)]
                });
            }
        }

        const originalDate = new Date(temp);

        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');


        const formattedDateString = `${year}-${month}-${day}`;

        const payload = {
            "stud_id": data.stud_id,
            "start_date": formattedDateString,
            "level_id": data.next_level_id,
            "level_status": "Not Completed",
            "created_by": data.created_by,
            "teacher_id": data.teacher_id,
            "session_details": trueSwitches
        }

        console.log(JSON.stringify(payload));
        console.log(`${CONST.baseUrl}/student/assign/assignlevel`);

        axios.post(`${CONST.baseUrl}/student/assign/assignlevel`, payload)
            .then(async (response) => {
                console.log(response.data)
                setData(response.data)
                await fetchAvailability()
                Toast.show({
                    type: 'success',
                    text1: 'Successfully Updated'
                })
                setSwitches({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false })
                setTime(["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"])
                setTime2(["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"])
            })
            .catch((error) => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: "Please try again later"
                })
            });

    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAvailability()
        });

        return unsubscribe;
    }, [navigation]);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);


    const onDismissSingle2 = React.useCallback(() => {
        setOpen2(false);
    }, [setOpen2]);

    const [visible, setVisible] = React.useState(false)
    const [time, setTime] = useState(["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"])
    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm =
        ({ hours, minutes }) => {
            setVisible(false);
            let _min = (minutes < 10) ? '0' + minutes : minutes
            let _hour = (hours < 10) ? '0' + hours : hours
            let _time = time
            _time[currentTimeIndex] = _hour + ":" + _min

            setTime(_time)
        }





    const onToggleSwitch = (id, value) => {
        if (value) setTotalDays(totalDays + 1)
        else setTotalDays(totalDays - 1)
    }

    const [switches, setSwitches] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false })


    const [visible2, setVisible2] = React.useState(false)
    const [time2, setTime2] = useState(["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"])

    const onDismiss2 = React.useCallback(() => {
        setVisible2(false)
    }, [setVisible2])

    const onConfirm2 =
        ({ hours, minutes }) => {
            setVisible2(false);
            let _min = (minutes < 10) ? '0' + minutes : minutes
            let _hour = (hours < 10) ? '0' + hours : hours
            let _time = time2
            _time[currentTimeIndex] = _hour + ":" + _min
            setTime2(_time)
            console.log({ hours, minutes });
        }

    return (

        <View style={{ backgroundColor: 'white' }}>

            <ScrollView style={{ backgroundColor: 'white', height: '100%' }} contentContainerStyle={{ alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
                    <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font }}>
                        Level {data.next_level_name.replace("level", "")}
                    </Text>
                    <View style={{ flexDirection: 'row', marginStart: 8 }}>
                        <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.grey, marginHorizontal: 2 }} />
                        <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.grey, marginHorizontal: 2 }} />
                        <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: COLORS.grey, marginHorizontal: 2 }} />

                    </View>
                </View>

                <View style={{ width: '98%', marginTop: SIZES.doubleLarge, flexDirection: 'row' }}>
                    <View style={{ marginHorizontal: 16, flex: 1, justifyContent: 'center' }}>
                        <Ionicons name="calendar-outline" size={22} color={COLORS.grey} style={{ position: 'absolute', right: 12 }} />
                        <TextInput
                            onPressOut={() => { setOpen(true) }}
                            value={temp} editable={false} variant="flat" label="Start Date" style={{ backgroundColor: COLORS.borderGrey, borderRadius: 4, paddingTop: 6 }} color={COLORS.darkGrey} />
                    </View>

                    {/* <View style={{ marginHorizontal: 16, flex: 1, justifyContent: 'center' }}>
                    <Ionicons name="calendar-outline" size={22} color={COLORS.grey} style={{ position: 'absolute', right: 12 }} />
                    <TextInput
                        onPressOut={() => { setOpen2(true) }}
                        value={temp2} editable={false} variant="flat" label="End Date" style={{ backgroundColor: COLORS.borderGrey, borderRadius: 4, paddingTop: 6 }} color={COLORS.darkGrey} />
                </View> */}
                </View>


                <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.grey, alignSelf: 'flex-start', marginStart: 16, marginTop: 16 }}>
                    Note:
                </Text>

                <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.font, color: COLORS.almostBlack, alignSelf: 'flex-start', marginStart: 16, marginTop: 4 }}>
                    Total {data.next_level_session_count.toString()} sessions in Level {data.next_level_name.replace("level", "")}. End Date will auto calculate based on the selection of the start date.
                </Text>


                <View style={{ width: '95%' }}>

                    <List.AccordionGroup>
                        <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Sunday" id="1">
                            <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                                <TextInput value={time[0]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(0)
                                    setVisible(true)
                                }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                                <TextInput value={time2[0]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(0)
                                    setVisible2(true)
                                }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            </View>
                            <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                                <Text
                                    onPress={() => { }}
                                    style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                    Request Postpone
                                </Text>
                                <Switch value={switches[0]} onValueChange={(value) => {
                                    if (totalDays >= 3 && value) return
                                    setSwitches(curr => ({ ...curr, 0: value }))
                                    onToggleSwitch(0, value)
                                }} color={COLORS.primary} />
                            </View>
                        </List.Accordion>

                        <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Monday" id="2">
                            <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                                <TextInput value={time[1]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(1)
                                    setVisible(true)
                                }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                                <TextInput value={time2[1]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(1)
                                    setVisible2(true)
                                }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            </View>
                            <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                                <Text
                                    onPress={() => { }}
                                    style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                    Request Postpone
                                </Text>

                                <Switch value={switches[1]} onValueChange={(value) => {
                                    if (totalDays >= 3 && value) return
                                    setSwitches(curr => ({ ...curr, 1: value }))
                                    onToggleSwitch(1, value)
                                }} color={COLORS.primary} />
                            </View>
                        </List.Accordion>

                        <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Tuesday" id="3">
                            <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                                <TextInput value={time[2]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(2)
                                    setVisible(true)
                                }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                                <TextInput value={time2[2]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(2)
                                    setVisible2(true)
                                }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            </View>
                            <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                                <Text
                                    onPress={() => { }}
                                    style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                    Request Postpone
                                </Text>

                                <Switch value={switches[2]} onValueChange={(value) => {
                                    if (totalDays >= 3 && value) return
                                    setSwitches(curr => ({ ...curr, 2: value }))
                                    onToggleSwitch(2, value)
                                }} color={COLORS.primary} />
                            </View>
                        </List.Accordion>

                        <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Wednesday" id="4">
                            <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                                <TextInput value={time[3]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(3)
                                    setVisible(true)
                                }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                                <TextInput value={time2[3]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(3)
                                    setVisible2(true)
                                }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            </View>
                            <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                                <Text
                                    onPress={() => { }}
                                    style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                    Request Postpone
                                </Text>

                                <Switch value={switches[3]} onValueChange={(value) => {
                                    if (totalDays >= 3 && value) return
                                    setSwitches(curr => ({ ...curr, 3: value }))
                                    onToggleSwitch(3, value)
                                }} color={COLORS.primary} />
                            </View>
                        </List.Accordion>

                        <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Thursday" id="5">
                            <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                                <TextInput value={time[4]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(4)
                                    setVisible(true)
                                }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                                <TextInput value={time2[4]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(4)
                                    setVisible2(true)
                                }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            </View>
                            <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                                <Text
                                    onPress={() => { }}
                                    style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                    Request Postpone
                                </Text>

                                <Switch value={switches[4]} onValueChange={(value) => {
                                    if (totalDays >= 3 && value) return
                                    setSwitches(curr => ({ ...curr, 4: value }))
                                    onToggleSwitch(4, value)
                                }} color={COLORS.primary} />
                            </View>
                        </List.Accordion>

                        <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Friday" id="6">
                            <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                                <TextInput value={time[5]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(5)
                                    setVisible(true)
                                }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                                <TextInput value={time2[5]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(5)
                                    setVisible2(true)
                                }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            </View>
                            <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                                <Text
                                    onPress={() => { }}
                                    style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                    Request Postpone
                                </Text>

                                <Switch value={switches[5]} onValueChange={(value) => {
                                    if (totalDays >= 3 && value) return
                                    setSwitches(curr => ({ ...curr, 5: value }))
                                    onToggleSwitch(5, value)
                                }} color={COLORS.primary} />
                            </View>
                        </List.Accordion>



                        <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Saturday" id="7">
                            <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                                <TextInput value={time[6]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(6)
                                    setVisible(true)
                                }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                                <TextInput value={time2[6]} editable={false} onPressOut={() => {
                                    setCurrentTimeIndex(6)
                                    setVisible2(true)
                                }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            </View>
                            <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                                <Text
                                    onPress={() => { }}
                                    style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                    Request Postpone
                                </Text>

                                <Switch value={switches[6]} onValueChange={(value) => {
                                    if (totalDays >= 3 && value) return
                                    setSwitches(curr => ({ ...curr, 6: value }))
                                    onToggleSwitch(6, value)
                                }} color={COLORS.primary} />
                            </View>
                        </List.Accordion>
                    </List.AccordionGroup>
                </View>
                <TimePickerModal

                    visible={visible}
                    onDismiss={onDismiss}
                    onConfirm={onConfirm}
                />
                <TimePickerModal
                    visible={visible2}
                    onDismiss={onDismiss2}
                    onConfirm={onConfirm2}
                />


                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    onDismiss={onDismissSingle}
                    label='Select Date'
                    date={date}
                    validRange={{ startDate: new Date(data.date) }}
                    startDate={new Date(data.date)}
                    onConfirm={
                        (date) => {
                            setTemp(date.date.toString().substring(4, 15))
                            setOpen(false)
                        }
                        //    onConfirmSingle
                    }
                />

                {/* <DatePickerModal
                locale="en"
                mode="range"
                visible={open2}
                startDate={new Date(data.date)}
                validRange={{startDate: new Date(data.date)}}
                onDismiss={onDismissSingle2}
                label='Select Date'
                date={date}
                onConfirm={
                    (date) => {
                        setTemp2(date.date.toString().substring(4, 15))
                        console.log(date.date)
                        setOpen2(false)
                    }
                }
            /> */}

                <View style={Styles.subViewContainer}>
                    <TouchableOpacity onPress={() => { postAvailability() }}
                        style={Styles.btnStyle}>
                        <Text style={Styles.btnTextStyle}>Save</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <Toast
                position='bottom'
                bottomOffset={20}
            />
        </View>

    )
}

export default Availability;

const Styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: "center",
        alignSelf: 'center',
        width: '90%'
    },
    header: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.extraLarge,
        alignContent: "center",
    },
    headerText: {
        fontSize: 16,
        alignContent: "center",
        textAlign: 'center',
        fontFamily: FONTS.regular
    },
    input: {
        height: 40,
        width: 350,
        margin: 12,
        borderWidth: 1,
        borderColor: "#0000001F",
        padding: 10,
    },
    subLoginViewContainer: {
        width: '100%',
        height: 50,
        alignSelf: "center",
        justifyContent: "center",
        borderColor: "#0000001F",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: SIZES.doubleLarge,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signinStyle: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
    },
    subViewContainer: {
        width: 350,
        height: 250,
        alignSelf: "center",
        justifyContent: "center",
    },
    btnStyle: {
        alignItems: "center",
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
    },

    btnTextStyle: {
        fontSize: 20,
        color: "#FFFFFF",
    },
});