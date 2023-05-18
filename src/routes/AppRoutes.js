import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from "react";

import Login from '../components/functional components/Auth/Login';
import Landing from '../components/functional components/Landing/Landing'
import TermsConditions from '../components/functional components/TermsConditions/TermsConditions';
import HomeTabView from "../components/functional components/Home/HomeTabView"
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppRoutes = ({ navigation }) => {



    const Stack = createNativeStackNavigator();
    const [state, setState] = useState(false)


    const finishAuth = () => {
        setState(false)
    }

    const logout = async () => {
        try {
            await AsyncStorage.setItem('AuthState', "-1")
        } catch (err) {
            alert(err)
        }


        setState(true)
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('AuthState')
            if (result !== null && result != "-1") {
                setState(false)
            } else {

                setState(true)
            }
        } catch (e) {
            console.error(e)
        }
    }




    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}>

            <Stack.Group screenOptions={{}}  >

                {state ? (<Stack.Group screenOptions={{}} >

                    <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} initialParams={{ finishAuth: finishAuth }} />


                    <Stack.Screen name="Login" component={Login} options={{ header: () => null }} initialParams={{ finishAuth: finishAuth }} />


                    <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ header: () => null }} initialParams={{ finishAuth: finishAuth }} />
                </Stack.Group>)

                    : (<Stack.Group screenOptions={{}}  >

                        <Stack.Screen name="HomeTabView" component={HomeTabView} initialParams={{logout: logout}} options={({ navigation, route }) => ({
                            headerShown: false,
                        })} />
                    </Stack.Group>)}

            </Stack.Group>

        </Stack.Navigator>
    );

}

export default AppRoutes;