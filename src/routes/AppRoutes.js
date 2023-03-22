import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../components/functional components/Auth/Login';
import Landing from '../components/functional components/Landing/Landing'
import TermsConditions from '../components/functional components/TermsConditions/TermsConditions';
import HomeTabView from "../components/functional components/Home/HomeTabView"

const AppRoutes = ({ navigation }) => {



    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="TermsConditions" component={TermsConditions} />

            <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeTabView" component={HomeTabView} options={({ navigation, route }) => ({
                headerShown: false,
            })} />
        </Stack.Navigator>
    );

}

export default AppRoutes;