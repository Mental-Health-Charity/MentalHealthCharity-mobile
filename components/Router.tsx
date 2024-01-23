import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../app/contexts/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../app/tabs/Home";
import Login from "../app/auth/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../app/tabs/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {user ? (
          <>
            {/* SCREENS DLA ZAUTORYZOWANYCH */}
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
