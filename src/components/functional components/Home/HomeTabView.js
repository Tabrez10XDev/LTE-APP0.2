import { React, useLayoutEffect, useCallback, useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Feather, Ionicons, Fontisto, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { StyleSheet } from "react-native";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import "react-native-gesture-handler";
import * as DocumentPicker from "expo-document-picker";
import Style from "./Style";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import StudentRoutes from "../StudentDashboard/StudentRoutes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext } from 'react';
import { ScrollView } from "react-native-gesture-handler";
import TeacherMaterial from "../../ui components/TeacherMaterial";
import Toast from 'react-native-toast-message';
import ProfileRoutes from "../Profile/ProfileRoutes";
import TicketStatus from "../Tickets/TicketStatus";
import moment from 'moment';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const TeacherIDContext = createContext(null);
const TeacherProfileContext = createContext(null);



const CustomDrawer = props => {
  const teacher = useContext(TeacherProfileContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            marginBottom: 20,
          }}
        >

          <View>
            <Text style={Styles.bold}>{teacher.teacher_name}</Text>
            <Text style={Styles.greyText}>{teacher.role}</Text>
            {teacher.tentative_start_date ? <Text style={Styles.greyText}>Since {moment(teacher.tentative_start_date.substring(0, 10), "YYYY-MM-DD").fromNow()}</Text> : null}
          </View>

        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          padding: 20,
        }}
      >
        <Text
          onPress={() => { props.initialParams.logout.logout() }}
          style={Styles.semiBold} >Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};



function TrainingMaterialTab({ navigation }) {


  const [trainingMaterial, setTrainingMaterial] = useState([])

  function getTrainingMaterials() {
    try {
      axios.get(
        `${CONST.baseUrl}/teacherresource/get_teacher_res_info`
      ).then((response) => {
        setTrainingMaterial(response.data)
      })
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getTrainingMaterials()
  }, [])

  //









  //

  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignSelf: "center",
        backgroundColor: 'white',
        paddingTop: SIZES.medium,
        paddingHorizontal: 16,
        alignItems: 'center'
      }}
    >
      <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%', justifyContent: 'center' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

        <View style={{ width: Dimensions.get('window').width * 0.9, alignItems: 'center', justifyContent: 'center' }}>
          {trainingMaterial.map((ele, index) => {
            return (<TeacherMaterial
              name={ele.teacher_res_name}
              desc={ele.teacher_res_desc}
              type={ele.teacher_res_type}
              size={ele.teacher_res_file_size}
              link="https://asset.cloudinary.com/db2bzxbn7/b91cab6fe5884dfe635a0e5c9b6151ff"
              key={index} />)
          })}
        </View>

      </ScrollView>


    </View>
  );
}



function UploadAudioTab({ route, navigation }) {
  const teacherID = useContext(TeacherIDContext);

  const [audioStatus, setAudioStatus] = useState("null")
  const [image, setImage] = useState("")

  function getAudioStatus() {
    try {
      axios.get(
        `${CONST.baseUrl}/audio/get/teacherdetails/audiostatus/${teacherID}`
      ).then((response) => {
        setAudioStatus(response.data.at(-1).audio_status)
        if (response.data.at(-1).audio_status == "submitted") {
          setImage(assets.waiting)
        } else if (response.data.at(-1).audio_status == "approved") {
          setImage(assets.approved)
        }
      })
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAudioStatus()
    });

    return unsubscribe;
  }, [navigation]);


  const ImagePlaceholder = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: "70%", height: "70%", resizeMode: 'contain' }}
          source={image}
        />

        <View style={{ padding: 8, borderColor: COLORS.darkGrey, borderStyle: 'dashed', borderWidth: 1, borderRadius: 8, paddingHorizontal: 36 }}>
          <Text style={{ fontSize: 16, fontWeight: 500, margin: 8 }}>
            {audioStatus ?? "NULL"}
          </Text>
        </View>


      </View>
    )
  }






  const date = new Date();
  const URL = `https://api.cloudinary.com/v1_1/db2bzxbn7/video/upload`;
  const [formData, setFormData] = useState({
    api_key: "164615611795246",
    timestamp: date.getTime(),
    upload_preset: "my_preset",
    file: "",
    cloud_name: "db2bzxbn7"
  });

  const [fileResponse, setFileResponse] = useState({});

  const audioSubmitBtn = useCallback(async () => {
    console.log("audiobutton clicked");
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

  const uploadAudio = async () => {


    const { name, uri } = fileResponse;
    let formDataObj = new FormData();
    if (uri) {
      formDataObj.append('file', { name, uri });
      formDataObj.append('api_key', formData.api_key);
      formDataObj.append('upload_preset', formData.upload_preset);


      try {
        axios.post(
          URL, formDataObj
        ).then((response) => {
          axios.post(
            `${CONST.baseUrl}/audio`, {
            teacher_id: teacherID,
            audio_file_name: name,
            audio_source: response.data.url ?? "",
            audio_status: "submitted",
            audio_reason: "",
            audio_audit_by: "tanu",
          }
          ).then((response) => {
            if (response.status == 200) {
              console.log(response.data)
              setAudioStatus("submitted")
              setImage(assets.waiting)
            }
          }
          ).catch((err => {
            Toast.show({
              type: 'error',
              text1: 'Unknown error occured'
            })

          }))
        })
      } catch (err) {
        console.error(e)
        Toast.show({
          type: 'error',
          text1: 'Unknown error occured'
        })

      }


    }

  };
  return (
    <View style={Style.mainAudioContainer}>
      {audioStatus != "unsubmitted" && audioStatus != "rejected" && audioStatus != null && audioStatus != "resend" ? <ImagePlaceholder /> : (
        <View style={Style.mainAudioContainer}>
          <Text style={Style.audioText}>
            Please share your voice audio file and we will get back to you once it
            approved
          </Text>
          <View style={Style.dragViewContainer}>
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

              <Text style={{ ...Style.greyText, alignSelf: 'center', marginTop: 2 }}>
                Status: {audioStatus ?? ""}
              </Text>
            </TouchableOpacity>
            {fileResponse.name != undefined ? (
              <View style={{ flexDirection: 'row', marginTop: 32, alignItems: 'center' }}>
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
          <View style={Style.subViewContainer}>
            <TouchableOpacity onPress={uploadAudio} style={Style.btnStyle}>
              <Text style={Style.btnTextStyle}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>)
      }
      <Toast
        position='bottom'
        bottomOffset={20}
      />
    </View>

  );
}

function HomeScreen({ route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#FFFFFF' }, tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
      }}>
      <Tab.Screen name="Training Material" component={TrainingMaterialTab} />
      <Tab.Screen name="Upload Audio" component={UploadAudioTab} />
    </Tab.Navigator>
  );
}


function MyProfileView() {
  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 300 }}>
        Welcome to My Profile page!
      </Text>
    </View>
  );
}


function HomeTabView({ route }) {

  const [data, setData] = useState({})

  const [stateID, setStateID] = useState("NULL")


  useEffect(() => {

    getData()
  }, [])


  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('AuthState')
      console.log("+++++++++++===============")
      console.log(value);
      setStateID(value)

      axios.post(
        `${CONST.baseUrl}/teacher/get/teacherdetails/app`, {
        teacher_id: value
      }
      ).then((response) => {
        setData(response.data[0])
      })
    } catch (e) {
      // error reading value
      console.error(e)
    }
  }


  return (
    <TeacherIDContext.Provider value={stateID}>
      <TeacherProfileContext.Provider value={data}>

        <Drawer.Navigator
          drawerContent={props => <CustomDrawer {...props} initialParams={{ logout: route.params }} />}
          initialParams={{ teacherID: stateID }}
          screenOptions={{
            headerTintColor: 'black', drawerActiveBackgroundColor: COLORS.primary, drawerActiveTintColor: 'white', headerStyle: {
              backgroundColor: COLORS.blueShade
            }
          }} >


          <Drawer.Screen
            name="Teacher's Training"
            component={HomeScreen}
            options={({ route }) => {
              return ({
                headerRight: () => (
                  <Ionicons name="notifications" size={22} color={COLORS.primary} style={{ marginEnd: 16 }} />
                ),
                drawerIcon: ({ focused, size }) => (
                  <Ionicons
                    name="md-home"
                    size={size}
                    color={focused ? 'white' : 'black'}
                  />
                ),
              })
            }
            }
          />
          <Drawer.Screen name="Student Profiles" component={StudentRoutes}
            initialParams={{ teacherID: stateID }}

            options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'Items'
              if (routeName == "Level Review") {
                return ({
                  drawerIcon: ({ focused, size }) => (
                    <Fontisto name="room" size={24} 
                    color={focused ? 'white' : 'black'}
                    />
                  ),
                  swipeEnabled: false, headerShown: false,

                })
              }
              return ({
                drawerIcon: ({ focused, size }) => (
                  <Fontisto name="room" size={24} 
                  color={focused ? 'white' : 'black'}
                  />
                ),

              })

            }
            }
          />
          <Drawer.Screen name="My Profile" component={ProfileRoutes} initialParams={data}
            options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? 'Items'
              if (routeName == "Contact SPOC")
                return ({
                  swipeEnabled: false, headerShown: false,
                  drawerIcon: ({ focused, size }) => (
                    <Ionicons
                      name="person"
                      size={size}
                      color={focused ? 'white' : 'black'}
                      />
                  ),
                })
              return ({
                drawerIcon: ({ focused, size }) => (
                  <Ionicons
                    name="person"
                    size={size}
                    color={focused ? 'white' : 'black'}
                  />
                ),
              })
            }} />

          <Drawer.Screen name="Ticket Status" component={TicketStatus}
            options={({ navigation, route }) => ({
              drawerIcon: ({ focused, size }) => (
                <FontAwesome name="ticket" size={24} 
                color={focused ? 'white' : 'black'}
                />
              ),
            })}
          />

        </Drawer.Navigator>
      </TeacherProfileContext.Provider>
    </TeacherIDContext.Provider>
  );
}

export default HomeTabView;

const Styles = StyleSheet.create({
  paragraph: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    textAlign: 'justify',
    flexWrap: 'wrap',
    color: COLORS.textBlack,

  },
  semiBold: {
    fontSize: SIZES.font,
    fontFamily: FONTS.semiBold,
    textAlign: 'justify',
    flexWrap: 'wrap',
    color: COLORS.textBlack,

  },
  bold: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    textAlign: 'justify',
    flexWrap: 'wrap',
    color: COLORS.textBlack,
  },
  greyText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.regular,
    textAlign: 'justify',
    flexWrap: 'wrap',
    color: COLORS.grey,
  }
});


