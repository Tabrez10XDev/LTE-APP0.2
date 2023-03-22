import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import AppRoutes from "./src/routes/AppRoutes";
import { useFonts } from 'expo-font';


const theme = {
  ...DefaultTheme,
  colour: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}


export default function App() {




  const [loaded] = useFonts({
    NunitoSansBold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    NunitoSansSemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
    // NunitoSansMedium: require("./assets/fonts/SF-Pro-Text-Medium.otf"),
    NunitoSansRegular: require("./assets/fonts/NunitoSans-Regular.ttf"),
  })

  if (!loaded) {
    return null;
  }



  return (
   <RootSiblingParent>
    <NavigationContainer theme={theme}>
      <AppRoutes/>
    </NavigationContainer>
   </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
