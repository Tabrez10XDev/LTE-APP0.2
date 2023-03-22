import { View, Text, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { React, useState } from "react";
import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, assets } from "../../../../constants";


const TermsConditions = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const nextBtn = () => {
    console.log("Terms Conditions button clicked");
    navigation.navigate('HomeTabView');
  };

  return (
    <View style={{ ...Styles.container, marginHorizontal: 16 }}>
      <Text style={{ ...Styles.header, marginTop: '40%' }}>
        Terms & Conditions
      </Text>
      <View style={Styles.section}>
        <Checkbox style={Styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? COLORS.primary : undefined} />
        <Text style={Styles.paragraph}>I understand that the training material should not be reproduced, misused or shared with anyone other than within the Let’s Teach English programme.</Text>
      </View>
      <View style={Styles.section}>
        <Checkbox
          style={Styles.checkbox}
          value={isChecked2}
          onValueChange={setChecked2}
          color={isChecked2 ? COLORS.primary : undefined}
        />
        <Text style={Styles.paragraph}>This programme requires minimum 3 months of commitment of 3 alternate days a week (40 minutes session) as decided by teacher and student. In the case I have to discontinue I will give a 2 week’s notice.</Text>
      </View>

      <View style={{...Styles.subViewContainer, position:'absolute', bottom:'15%'}}>
        <TouchableOpacity style={Styles.btnStyle} onPress={nextBtn}>
          <Text style={Styles.btnTextStyle}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsConditions;


const Styles = StyleSheet.create({
  header: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.extraLarge,
    alignContent: "center",
  },
  container: {
    width: '90%',
    alignSelf:'center',
    height:'100%'
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '80%',
    marginTop: SIZES.extraLarge
  },
  paragraph: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    textAlign: 'justify',
    flexWrap: 'wrap'
  },
  checkbox: {
    marginEnd: 10,
    marginTop: 5
  },
  subViewContainer: {
    width: 350,
    height: 60,
    alignSelf: "center",
    justifyContent: "center"
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

