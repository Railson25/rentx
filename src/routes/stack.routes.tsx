import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { CarDetails } from "../screens/CarDetails";
import { Home } from "../screens/Home";
import { MyCars } from '../screens/MyCars';
import { Scheduling } from "../screens/Scheduling";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SignIn } from '../screens/SignIn';
import { Splash } from '../screens/Splash';


const {Navigator, Screen} = createStackNavigator()

export function StackRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false }} initialRouteName='Splash' >
            <Screen name="Splash" component={Splash} />
            <Screen name="SignIn" component={SignIn} />
            <Screen name="Home" component={Home} options={{gestureEnabled: false}}/>
            <Screen name="MyCars" component={MyCars} />
            <Screen name="CarDetails" component={CarDetails} />
            <Screen name="Scheduling" component={Scheduling} />
            <Screen name="SchedulingDetails" component={SchedulingDetails} />
            <Screen name="SchedulingComplete" component={SchedulingComplete} />
        </Navigator>
    )
}