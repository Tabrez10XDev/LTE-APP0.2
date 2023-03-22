import { Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { React, useState } from "react";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";
import { TextInput } from "@react-native-material/core";



import { StyleSheet } from "react-native";

const Login = ({ navigation }) => {



  const [passIcon, setPassIcon] = useState(false)
  const [visibility, setVisibility] = useState(false)


  const [loginDetails, setLoginDetails] = useState({
    "username": "",
    "password": ""
  });
  const onChangeLoginDetails = (nativeEvent) => {

    //setLoginDetails({...loginDetails, username:nativeEvent.Text});
    setLoginDetails({ ...loginDetails, password: nativeEvent.Text });
  };

  const loginSubmitBtn = () => {
    console.log("login button clicked");
    navigation.navigate('TermsConditions');
  };

  return (
    <View style={Styles.loginContainer}>
      <Text style={{ ...Styles.header, marginTop: '40%' }}>
        Login
      </Text>
      <Text style={{ ...Styles.headerText, color: COLORS.grey, marginTop: SIZES.small }}>
        In learning you will teach, and in teaching {'\n'} you will learn.
      </Text>

      <TouchableOpacity
        style={{ height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: SIZES.doubleLarge, borderWidth: 1, borderColor: COLORS.borderGrey, width: '100%' }}
        onPress={() => { }}
      >

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ height: 24, width: 24, marginEnd: 8 }}
            source={assets.google}
          />
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium, fontWeight: FONTS.semiBold }}>Sign in with Google</Text>
        </View>

      </TouchableOpacity>
      <Text style={{ ...Styles.headerText, marginTop: SIZES.medium }}>Or</Text>



      <TextInput onChangeText={username => setLoginDetails({ ...loginDetails, username: username })} value={loginDetails.username} keyboardType="email-address" variant="outlined" label="Username  " style={{ marginHorizontal: 16, width: '100%', marginTop: SIZES.medium }} color={COLORS.darkGrey} />
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
    </View>
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
    backgroundColor: "#FF758F",
    padding: 10,
    borderRadius: 5,
  },

  btnTextStyle: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});
