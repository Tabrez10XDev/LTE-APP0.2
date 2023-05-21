import 'react-native-gesture-handler';

import * as React from "react";


import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeacherDashboard from './TeacherDashboard';
import ContactSpoc from './ContactSpoc';
const Stack = createNativeStackNavigator();

const ProfileRoutes = ({route}) => {
    return (
        <Stack.Navigator initialParams={{ teacherID: route.params.teacherID }}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="My Profile" component={TeacherDashboard}  />
            {/* <Stack.Screen name="Contact SPOC" component={StudentProfileView} /> */}

        </Stack.Navigator>
    )
}

export default ProfileRoutes;