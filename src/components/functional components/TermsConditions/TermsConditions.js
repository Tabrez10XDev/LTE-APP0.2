import { View, Text , TouchableOpacity} from "react-native";
import Checkbox from 'expo-checkbox';
import {React , useState} from "react";
import { StyleSheet } from "react-native";

const TermsConditions = ({navigation}) => {
    const [isChecked, setChecked] = useState(false);

    const nextBtn = ()=>{
        console.log("Terms Conditions button clicked");
        navigation.navigate('HomeTabView');
      };

  return (
    <View style={Styles.container}>
      <View style={Styles.section}>
        <Checkbox style={Styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={Styles.paragraph}>I understand that the training material should not be reproduced, misused or shared with anyone other than within the Let’s Teach English programme.</Text>
      </View>
      <View style={Styles.section}>
        <Checkbox
          style={Styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text style={Styles.paragraph}>This programme requires minimum 3 months of commitment of 3 alternate days a week (40 minutes session) as decided by teacher and student. In the case I have to discontinue I will give a 2 week’s notice.</Text>
      </View>
      <View style={Styles.subViewContainer}>
     <TouchableOpacity onPress={nextBtn}
        style={Styles.btnStyle}>
        <Text style={Styles.btnTextStyle}>NEXT</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
};

export default TermsConditions;


const Styles= StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 16,
        // marginVertical: 32,
      },
      section: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width:300, 
        margin:10
      },
      paragraph: {
        fontSize: 16,
        fontWeight:'400',
        textAlign:'justify',
      },
      checkbox: {
        margin: 10,
      },
      subViewContainer: { 
        width: 350,
        height:480, 
        alignSelf:"center",
        justifyContent:"flex-end" 
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

