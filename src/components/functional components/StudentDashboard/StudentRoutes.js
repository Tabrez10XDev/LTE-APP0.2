import 'react-native-gesture-handler';

import * as React from "react";


import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentsList from './StudentsList';
import StudentProfileView from "../StudentDashboard/studdashboard";
import LevelReview from '../Sessions/LevelReview';

const Stack = createNativeStackNavigator();

const StudentRoutes = ({route}) => {
    return (
        <Stack.Navigator initialParams={{ teacherID: route.params.teacherID }}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Students List" component={StudentsList} />
            <Stack.Screen name="Student Profile" component={StudentProfileView} />
            <Stack.Screen name="Level Review" component={LevelReview} />

        </Stack.Navigator>
    )
}

export default StudentRoutes;