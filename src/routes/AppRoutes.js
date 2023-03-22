import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../components/functional components/Auth/Login';
import Landing from '../components/functional components/Landing/Landing'
import TermsConditions from '../components/functional components/TermsConditions/TermsConditions';
import HomeTabView from "../components/functional components/Home/HomeTabView"

const AppRoutes = ({ navigation }) => {



    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ contentStyle: {backgroundColor: '#FFFFFF'}}}>
            <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />


            <Stack.Screen name="HomeTabView" component={HomeTabView} options={({ navigation, route }) => ({
                headerShown: false,
            })} />

            <Stack.Screen name="Login" component={Login} options={{ header: () => null }}/>


            <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ header: () => null }} />


        </Stack.Navigator>
    );

}

export default AppRoutes;