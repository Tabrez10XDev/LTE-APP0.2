import { React, useLayoutEffect, useCallback, useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { StyleSheet } from "react-native";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import "react-native-gesture-handler";
// import DocumentPicker, { types } from 'react-native-document-picker';
import * as DocumentPicker from "expo-document-picker";
import Style from "./Style";
import StudentTraining from "./Training/StudentTraining";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import StudentRoutes from "../StudentDashboard/StudentRoutes";
import TeacherDashboard from "../Profile/TeacherDashboard";

//Create Instance for all Navigators
const Tab = createMaterialTopTabNavigator();
//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const CustomDrawer = props => {
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
            <Text style={Styles.bold}>Mr. Deepak Sharma</Text>
            <Text style={Styles.greyText}>M.Sc</Text>
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
        <Text style={Styles.semiBold} >Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};



function TrainingMaterialTab({ navigation }) {
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
      <Text style={Styles.paragraph}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using ‘Content here, content here’, making it
        look like readable English.
      </Text>
      <Image
        style={{ width: Dimensions.get('window').width - 32, height: Dimensions.get('window').width * 0.70, resizeMode: 'cover', marginVertical: SIZES.smallFont }}
        source={{
          uri: "https://source.unsplash.com/1024x768/?tree",
        }}
      />
      <Text style={Styles.paragraph}>
        Many desktop publishing packages and web page editors now use Lorem
        Ipsum as their default model text, and a search for ‘lorem ipsum’ will
        uncover many web sites still in their infancy. Various versions have
        evolved over the years.
      </Text>
      <View style={Style.subViewContainer}>
        <TouchableOpacity style={Style.btnStyle}>
          <Text style={Style.btnTextStyle}>DOWNLOAD MATERIALS</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}



function UploadAudioTab({route}) {

  const [audioStatus, setAudioStatus] = useState("APproved")
  const [image, setImage] = useState(assets.approved)

  function getAudioStatus() {
    axios.get(
      `${CONST.baseUrl}/audio/get/teacher/audiostatus/${route.params.teacherID}`
    ).then((response) => {
      setAudioStatus(response.data.at(-1).audio_status)
      if(response.data.at(-1).audio_status == "submitted"){
        setImage(assets.waiting)
      }else if(response.data.at(-1).audio_status == "approved"){
        setImage(assets.approved)
      }
    }).catch((error) => {
      console.log(error)
    });
  }


  useEffect(() => {
    getAudioStatus()
  }, [])


  const ImagePlaceholder = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: "70%", height: "70%", resizeMode: 'contain' }}
          source={image}
        />

        <View style={{ padding: 8, borderColor: COLORS.darkGrey, borderStyle: 'dashed', borderWidth: 1, borderRadius: 8, paddingHorizontal: 36 }}>
          <Text style={{ fontSize: 16, fontWeight: 500, margin: 8 }}>
            {audioStatus.toUpperCase()}
          </Text>
        </View>


      </View>
    )
  }






  const date = new Date();
  const URL = `https://api.cloudinary.com/v1_1/db2bzxbn7/upload`;
  const [formData, setFormData] = useState({
    public_id: "lte_teachers",
    api_key: "164615611795246",
    timestamp: date.getTime(),
    upload_preset: "my_preset",
    file: "",
    cloud_name: "db2bzxbn7"
  });
  const [isAudioComponentLoaded, setAudioComponentLoaded] = useState(false);
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
      formDataObj.append('public_id', formData.public_id);
      formDataObj.append('api_key', formData.api_key);
      formDataObj.append('cloud_name', formData.cloud_name);
      formDataObj.append('timestamp', formData.timestamp);
      formDataObj.append('upload_preset', formData.upload_preset);


      axios.post(
        URL, formDataObj
      ).then((response) => {
        console.log("-------------------");
        console.log(JSON.stringify(response));
        console.log("-------------------");
      }).catch((error) => {
        console.log(error)
      });


    }

  };
  return (
    <View style={Style.mainAudioContainer}>
      {audioStatus != "unsubmitted" && audioStatus != "rejected" ? <ImagePlaceholder /> : (
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
    </View>

  );
}

function HomeScreen({ route }) {
  return (
    <Tab.Navigator
      initialParams={{ teacherID: route.params.teacherID }}
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


function HomeTabView() {

  const [data, setData] = useState({})

  const [stateID, setStateID] = useState(false)


  useEffect(() => {
    load()
  }, [])

  const load = async () => {

    AsyncStorage.getItem('AuthState').then(result => {
      console.log(result)
      if (result !== null && result != "LoggedOut") {
        setStateID(result)
      } else {
        setStateID("LoggedOut")
      }
    })

  }




  useEffect(() => {
    let data = JSON.stringify({
      "teacher_id": 40
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://lte-backend.onrender.com/api/teacher/get/teacherdetails/app',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });

  }, [])



  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

    switch (routeName) {
      case 'Feed':
        return 'News feed';
      case 'Profile':
        return 'My profile';
      case 'Account':
        return 'My account';
    }
  }


  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialParams={{ teacherID: stateID }}

      screenOptions={{ headerTintColor: 'black', drawerActiveBackgroundColor: COLORS.primary, drawerActiveTintColor: 'white' }} >
      <Drawer.Screen
        name="Teacher's Training"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <Ionicons name="notifications" size={22} color="#FF758F" style={{ marginEnd: 16 }} />
          ),
        })
        }
      />
      <Drawer.Screen name="Student Profiles" component={StudentRoutes}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Items'

          if (routeName == "Level Review")
            return ({ swipeEnabled: false, headerShown: false })
        }}
      />
      <Drawer.Screen name="My Profile" component={TeacherDashboard} initialParams={data} />
    </Drawer.Navigator>
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


