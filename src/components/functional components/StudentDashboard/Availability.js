import { Text, View, Image } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { TextInput } from "@react-native-material/core";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons } from "@expo/vector-icons";

import { ScrollView } from "react-native-gesture-handler";
import { TimePickerModal } from 'react-native-paper-dates';
import { Switch } from 'react-native-paper';

const Availability = () => {

    const [date, setDate] = useState()

    const [temp, setTemp] = useState()
    const [open, setOpen] = React.useState(false);

    const [temp2, setTemp2] = useState()
    const [open2, setOpen2] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);


    const onDismissSingle2 = React.useCallback(() => {
        setOpen2(false);
    }, [setOpen2]);

    const [visible, setVisible] = React.useState(false)
    const [time, setTime] = useState()
    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            let _min = (minutes < 10) ? '0' + minutes : minutes
            let _hour = (hours < 10) ? '0' + hours : hours
            setTime(_hour + ":" + _min)
            console.log({ hours, minutes });
        },
        [setVisible]
    );



    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


    const [visible2, setVisible2] = React.useState(false)
    const [time2, setTime2] = useState()

    const onDismiss2 = React.useCallback(() => {
        setVisible2(false)
    }, [setVisible2])

    const onConfirm2 = React.useCallback(
        ({ hours, minutes }) => {
            setVisible2(false);
            let _min = (minutes < 10) ? '0' + minutes : minutes
            let _hour = (hours < 10) ? '0' + hours : hours
            setTime2(_hour + ":" + _min)
            console.log({ hours, minutes });
        },
        [setVisible2]
    );

    return (

        <ScrollView style={{ backgroundColor: 'white', height: '100%' }} contentContainerStyle={{ alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
                <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font }}>
                    Level 2
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
                        value={temp} editable={false} variant="flat" label="Start Date" style={{ backgroundColor: COLORS.borderGrey, borderRadius:4 }} color={COLORS.darkGrey} />
                </View>

                <View style={{ marginHorizontal: 16, flex: 1, justifyContent: 'center' }}>
                    <Ionicons name="calendar-outline" size={22} color={COLORS.grey} style={{ position: 'absolute', right: 12 }} />
                    <TextInput
                        onPressOut={() => { setOpen2(true) }}
                        value={temp2} editable={false} variant="flat" label="End Date" style={{ backgroundColor: COLORS.borderGrey, borderRadius:4 }} color={COLORS.darkGrey} />
                </View>
            </View>


            <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.grey, alignSelf: 'flex-start', marginStart: 16, marginTop: 16 }}>
                Note:
            </Text>

            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.font, color: COLORS.almostBlack, alignSelf: 'flex-start', marginStart: 16, marginTop: 4 }}>
                Total 21 sessions in Level 2. End Date will auto calculate based on the selection of the start date.
            </Text>


            <View style={{ width: '95%' }}>

                <List.AccordionGroup>
                    <List.Accordion style={{ backgroundColor: 'white', borderTopWidth: 1, borderColor: COLORS.borderGrey, marginTop: 12 }} title="Sunday" id="1">
                        <View style={{ width: '98%', marginTop: SIZES.font, flexDirection: 'row' }}>
                            <TextInput value={time} editable={false} onPressOut={() => { setVisible(true) }} variant="outlined" label="Start Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                            <TextInput value={time2} editable={false} onPressOut={() => { setVisible2(true) }} variant="outlined" label="End Time" style={{ marginHorizontal: 16, flex: 1 }} color={COLORS.darkGrey} />
                        </View>
                        <View style={{ width: '95%', marginTop: SIZES.medium, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center' }}>

                            <Text
                                onPress={() => { }}
                                style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.font, color: COLORS.blue, alignSelf: 'center' }}>
                                Request Postpone
                            </Text>

                            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={COLORS.primary} />
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
                onConfirm={
                    (date) => {
                        setTemp(date.date.toString().substring(4, 15))
                        console.log(date.date)
                        setOpen(false)
                    }
                    //    onConfirmSingle
                }
            />

            <DatePickerModal
                locale="en"
                mode="single"
                visible={open2}
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
            />




        </ScrollView>
    )
}

export default Availability;