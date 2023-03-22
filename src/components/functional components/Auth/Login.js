import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { React, useState } from "react";
import { StyleSheet } from "react-native";

const Login = ({navigation}) => {
  const [loginDetails, setLoginDetails] = useState({
    "username":"", 
    "password":""
  });
  const onChangeLoginDetails = (nativeEvent)=>{

    //setLoginDetails({...loginDetails, username:nativeEvent.Text});
    setLoginDetails({...loginDetails, password:nativeEvent.Text});
  };

  const loginSubmitBtn = ()=>{
    console.log("login button clicked");
    navigation.navigate('TermsConditions');
  };
  return (
    <View style={Styles.loginContainer}>
      <Text style={Styles.headerText}>
        In learning you will teach, and in teaching you will learn.
      </Text>
      <View style={Styles.subLoginViewContainer}>
        <TouchableOpacity style={Styles.signinStyle}>
          <Text><MaterialCommunityIcons name="email-outline" size={24} color="#FF758F" /> Sign in With Google</Text>
        </TouchableOpacity>
      </View>
      <Text style={Styles.headerText}>OR</Text>
      <View>
        <TextInput style={Styles.input} onChangeText={username =>setLoginDetails({...loginDetails, username:username})} value={loginDetails.username} keyboardType="email-address" placeholder="Email ID"/>
        <TextInput style={Styles.input} secureTextEntry={true} onChangeText={password =>setLoginDetails({...loginDetails, password:password})} value={loginDetails.password} keyboardAppearance="dark" placeholder="Password"/>
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
      justifyContent: "flex-end",
    },
    headerText: {
      fontSize: 16,
      alignContent: "center",
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
      width: 350,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      borderColor: "#0000001F",
      borderWidth: 1,
      borderRadius: 5,
    },
    signinStyle: {
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
