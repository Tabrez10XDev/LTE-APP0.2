import { Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { React, useState } from "react";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../../constants";
import { TextInput } from "@react-native-material/core";
import Toast from 'react-native-toast-message';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



import { StyleSheet } from "react-native";
import { log } from "react-native-reanimated";

const Login = ({ navigation, route }) => {



  const [passIcon, setPassIcon] = useState(false)
  const [visibility, setVisibility] = useState(false)



  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const [loginDetails, setLoginDetails] = useState({
    "email": "",
    "password": ""
  });


  const saveLogin = async (id) => {
    try {
      await AsyncStorage.setItem('AuthState', id)
    } catch (err) {
      alert(err)
    }
  }

  const loginSubmitBtn = () => {
    if (validateEmail(loginDetails.email) == null) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email'
      })
    } else if (loginDetails.password.trim() == "") {
      Toast.show({
        type: 'error',
        text1: 'Empty Password'
      })
    } else {

      // navigation.navigate('TermsConditions');


      axios.post(
        `${CONST.baseUrl}/teacher/get/teacherlogin`, loginDetails
      ).then((response) => {

        if (response.data[0].is_commitment_three_months === true && response.data[0].is_agreed_lte_policy === true) {
          saveLogin(response.data[0].teacher_id.toString())
          route.params.finishAuth()
        } else {
          navigation.navigate('TermsConditions', { teacher_id: response.data[0].teacher_id.toString() });
        }
      }).catch((error) => {
        console.error(error)
        console.log(error.response);
        Toast.show({
          type: 'error',
          text1: 'Unknown error occured'
        })
      });

    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}>
        <ScrollView>
<TouchableWithoutFeedback onPress={Keyboard.dismiss} >

   <View style={Styles.loginContainer} >

      <Image
        style={{ height: 200, width: 200, resizeMode:'contain', marginTop:'25%'}}
        source={assets.logo} />

      <Text style={{ ...Styles.header, marginTop: 24 }}>
        Login
      </Text>
      <Text style={{ ...Styles.headerText, color: COLORS.grey, marginTop: SIZES.small }}>
        In learning you will teach, and in teaching {'\n'} you will learn.
      </Text>

     
      <TextInput onChangeText={username => setLoginDetails({ ...loginDetails, email: username })} value={loginDetails.email} keyboardType="email-address" variant="outlined" label="Email" style={{ marginHorizontal: 16, width: '100%', marginTop: SIZES.medium, marginTop: 72 }} color={COLORS.darkGrey} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.medium }}>
        <TextInput onChangeText={password => setLoginDetails({ ...loginDetails, password: password })} value={loginDetails.password} secureTextEntry={!visibility} variant="outlined" label="Password" style={{ marginHorizontal: 16, width: '100%' }} color={COLORS.darkGrey} />
        <TouchableOpacity
          onPress={() => {
            setVisibility(!visibility)
            setPassIcon(!passIcon)
          }}
          style={{ alignItems: 'center', justifyContent: 'center', width: 32, height: 32, position: 'absolute', right: 24, zIndex: 5 }}
        >
          <Image
            source={passIcon ? (assets.hidePassword) : assets.showPassword}
            style={{ width: 32, height: 32, resizeMode: "contain" }}
          />

        </TouchableOpacity>
      </View>


      <View style={Styles.subViewContainer}>
        <TouchableOpacity onPress={loginSubmitBtn}
          style={Styles.btnStyle}>
          <Text style={Styles.btnTextStyle}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <Toast
        position='bottom'
        bottomOffset={20}
      />
    
    </View>

    </TouchableWithoutFeedback>
    </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default Login;


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
