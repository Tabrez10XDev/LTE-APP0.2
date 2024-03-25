import { Text, View, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Modal, Pressable } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { List, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import { DatePickerModal } from 'react-native-paper-dates';
import { Ionicons, MaterialIcons, Feather, FontAwesome, AntDesign } from "@expo/vector-icons";
import TicketListItem from "../../ui components/TicketListItem";
import axios from "axios";
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';

const TicketStatus = ({ navigation, route }) => {


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



    const [stackIndex, setStackIndex] = useState(1);
    const [popup, setPopup] = useState(false)

    const [allTickets, setAllTickets] = useState([])
    const [activeTickets, setActiveTickets] = useState([])
    const [resolvedTickets, setResolvedTickets] = useState([])
    const [ticketList, setTicketList] = useState([])
    const [content, setContent] = useState({
        createdAt: "",
        updatedAt: ""
    })
    const [title, setTitle] = useState("")



    const getTicketsList = async () => {
        try {
            playAnimation()
            const teacherID = await AsyncStorage.getItem('AuthState')
            axios.get(
                `${CONST.baseUrl}/teacherapp/all/tickets/${teacherID}`
            ).then((response) => {
                console.log(response.data);
                pauseAnimation()
                const data = response.data
                data.map((ele, index) => {
                    setTicketList(oldArray => [...oldArray, ele]);
                    setAllTickets(oldArray => [...oldArray, ele]);
                    if (ele.replied_by === null) {
                        setActiveTickets(oldArray => [...oldArray, ele]);
                    } else {
                        setResolvedTickets(oldArray => [...oldArray, ele]);
                    }
                })
            })
        } catch (e) {
            // error reading value
            pauseAnimation()
            console.error(e.response)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTicketList([])
            setActiveTickets([])
            setResolvedTickets([])
            setAllTickets([])
            setStackIndex(1)
            getTicketsList()
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <View style={{ backgroundColor: COLORS.blueShade, width: '100%', height: '100%', padding: 16, alignItems: 'center' }}>
            <View style={{ width: '100%', justifyContent: 'center' }}>

                <TextInput onChangeText={(text) => { }} placeholder="Search..." style={{ height: 60, width: '100%', borderRadius: 16, backgroundColor: 'white', paddingHorizontal: 42, alignItems: 'center', flexDirection: 'row' }} selectionColor={COLORS.grey}>

                </TextInput>
                <Ionicons name="search" size={22} color={COLORS.primary} style={{ position: 'absolute', left: 16 }} />
            </View>

            <View style={{ flexDirection: 'row', width: '100%', marginTop: 12, justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    onPress={() => {
                        setStackIndex(1)
                        setTicketList(allTickets)
                    }}
                    style={[stackIndex == 1 ? styles.selectedBox : styles.unSelectedBox]}
                >
                    <Text style={[stackIndex == 1 ? styles.selectedText : styles.unSelectedText]}>
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setStackIndex(2)
                        setTicketList(activeTickets)
                    }}
                    style={[stackIndex == 2 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 2 ? styles.selectedText : styles.unSelectedText]}>
                        Active
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setStackIndex(3)
                        setTicketList(resolvedTickets)
                    }}
                    style={[stackIndex == 3 ? styles.selectedBox : styles.unSelectedBox]}>
                    <Text style={[stackIndex == 3 ? styles.selectedText : styles.unSelectedText]}>
                        Archived
                    </Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity
                onPress={() => {
                    console.log("hii");
                    navigation.navigate('Contact SPOC');
                }}
                style={{ position: 'absolute', bottom: 96, right: 36, zIndex:16 }}>
                <AntDesign name="pluscircle" size={48} color={COLORS.primary} />
            </TouchableOpacity>


            <ScrollView style={{ marginTop: 12, marginBottom: 8 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ width: Dimensions.get('window').width * 0.9 }}>

                {
                    ticketList.map((ele, index) => {
                        console.log(ele);
                        return (
                            <TicketListItem id={index + 1} name={ele.msg_title} time={`Since ${moment(ele.created_at.substring(0, 16), "YYYY-MM-DDTHH:mm").fromNow()}`} status={ele.replied_by == null ? false : true} onClick={() => {
                                setTitle(ele.msg_title)
                                setContent({ descp: ele.msg_description, reply: ele.reply_message, createdAt: ele.created_at, by: ele.replied_by, updatedAt: ele.updated_at })
                                setPopup(true)
                            }} />
                        )
                    })
                }

                {
                    ticketList.length === 0 && !animSpeed  && <Text style={{ marginTop: 64, fontFamily: FONTS.bold, color: COLORS.darkGrey, fontSize: 16, alignSelf: 'center' }}>
                        No Ticket to show
                    </Text> 
                }
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={popup}
                onRequestClose={() => {
                    setPopup(!popup);
                }}
            >
                <View style={{ ...styles.modalView, paddingBottom: 0 }}>

                    <View style={{
                        backgroundColor: COLORS.blueShade, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '5%'
                    }}>


                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.textBlack,
                                marginVertical: 14,
                            }}
                        >Ticket Information</Text>
                        <TouchableOpacity
                            style={{ padding: 4 }}
                            onPress={() => {
                                setPopup(!popup)
                            }
                            }
                        >
                            <AntDesign name="closecircle" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', paddingBottom: 0 }}>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.grey,
                                marginTop: 8,
                                flex: 4
                            }}
                        >Subject</Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.textBlack,
                                marginTop: 8,
                                flex: 11
                            }}
                        >{title}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.grey,
                                marginTop: 8,
                                flex: 4
                            }}
                        >Ticket</Text>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.textBlack,
                                marginTop: 8,
                                flex: 11
                            }}
                        >{content.descp}</Text>
                    </View>



                    {content.reply &&
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.grey,
                                    marginTop: 8,
                                    flex: 4
                                }}
                            >Reply{'\n'}Message</Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.textBlack,
                                    marginTop: 8,
                                    flex: 11
                                }}
                            >{content.reply}</Text>
                        </View>}

                    {content.reply &&
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.grey,
                                    marginTop: 8,
                                    flex: 4
                                }}
                            >Replied{'\n'}By</Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: SIZES.medium,
                                    fontFamily: FONTS.semiBold,
                                    color: COLORS.textBlack,
                                    marginTop: 8,
                                    flex: 11
                                }}
                            >{content.by}</Text>
                        </View>}





                    <View style={{ backgroundColor: COLORS.blueShade, width: '100%', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '5%', marginTop: 2 }}>

                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: SIZES.regular,
                                fontStyle: 'italic',
                                color: COLORS.textBlack,
                                marginVertical: 14,
                                flex: 1
                            }}
                        >Ticket Raised {moment(new Date(content.createdAt.substring(0, 16))).fromNow()}</Text>

                        {content.updatedAt &&

                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: SIZES.regular,
                                    fontStyle: 'italic',
                                    color: COLORS.textBlack,
                                    marginVertical: 14,
                                    flex: 1
                                }}
                            >Ticket Resolved {moment(content.updatedAt.substring(0, 16)).fromNow()}</Text>
                        }
                    </View>



                    {/* <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 24 }}>

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
                    </View> */}

                </View>
            </Modal>




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
                        {/* <Text
                            style={{
                                fontFamily: FONTS.bold,
                                fontSize: SIZES.large,
                                flexWrap: 'wrap',
                                marginTop: -48
                            }}>
                        </Text> */}
                    </View>

                </View>

            }
       
        </View>

    )
}

export default TicketStatus;

const styles = StyleSheet.create({
    unSelectedBox: {
        borderRadius: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        flex: 1
    },
    selectedBox: {
        borderRadius: 8,
        borderWidth: 1,
        flex: 1,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 8
    },
    unSelectedText: {
        fontFamily: FONTS.regular, color: COLORS.primary, fontSize: 14
    },
    selectedText: {
        fontFamily: FONTS.regular, color: 'white', fontSize: 14
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

