import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="WelCome"
        component={Welcome}
      ></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "white",
        }}
        name="CreateAccount"
        component={CreateAccount}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
