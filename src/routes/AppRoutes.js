import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react";

import Login from '../components/functional components/Auth/Login';
import Landing from '../components/functional components/Landing/Landing'
import TermsConditions from '../components/functional components/TermsConditions/TermsConditions';
import HomeTabView from "../components/functional components/Home/HomeTabView"

const AppRoutes = ({ navigation }) => {



    const Stack = createNativeStackNavigator();
    const [state, setState] = useState(false)


    const finishAuth = () => {
        setState(true)
      }

    useEffect(() => {
        load()
    }, [])

    const load = async () => {

        AsyncStorage.getItem('AuthState').then(result => {
            console.log(result)
            if (result !== null && result != "LoggedOut") {
                setState(true)
            } else {
                setState(false)
            }
        })

    }



    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}>

            <Stack.Group screenOptions={{}}  >

                {state ? (<Stack.Group screenOptions={{}} initialParams={{ finishAuth: finishAuth }}  >

                    <Stack.Screen name="Landing" component={Landing} options={{ header: () => null }} />


                    <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />


                    <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ header: () => null }} />
                </Stack.Group>)

                    : (<Stack.Group screenOptions={{}}  >

                        <Stack.Screen name="HomeTabView" component={HomeTabView} options={({ navigation, route }) => ({
                            headerShown: false,
                        })} />
                    </Stack.Group>)}

            </Stack.Group>

        </Stack.Navigator>
    );

}

export default AppRoutes;