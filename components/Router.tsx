import React from "react";
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useAuth } from "../app/contexts/authContext";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Home from "../app/tabs/Home";
import Login from "../app/auth/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../app/tabs/Profile";
import Register from "../app/auth/Register";
import Chats from "../app/tabs/Chats";
import ChatScreen from "./chat/ChatScreen";
import Post from "../app/tabs/Post";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type ChatStackParamList = {
  ChatScreen?: any;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Posts" component={Post} />
    </Tab.Navigator>
  );
};

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const Router = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <>
          <MyTabs />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="AuthScreens"
            component={AuthScreens}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Router;
