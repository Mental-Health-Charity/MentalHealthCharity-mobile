import React, { useState } from "react";
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
import ArticleScreen from "../app/screens/ArticleScreen";
import ProfileModal from "./profile/profileModal";
import Icon from "react-native-vector-icons//MaterialIcons";
import { View } from "react-native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  ChatScreen?: undefined;
  AuthScreens?: undefined;
  ArticleScreen?: any;
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export const MyTabs = () => {
  const { user, logout } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: "rgb(250 204 21)",
          tabBarActiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="home" size={24} color={"black"} />,
          }}
        />
        <Tab.Screen
          name="Chats"
          component={Chats}
          options={{
            tabBarIcon: () => <Icon name="chat" size={24} color={"black"} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => <Icon name="person" size={24} color={"black"} />,
          }}
          listeners={{
            tabPress: () => {
              console.log("Im opening");
              openModal();
            },
          }}
        />
      </Tab.Navigator>
      <ProfileModal
        isVisible={isModalVisible}
        onClose={closeModal}
        username={user?.username}
        role={user?.user_role}
        description="I am the description"
        onLogout={() => logout()}
      />
    </>
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
          <Stack.Screen
            name="ArticleScreen"
            component={ArticleScreen}
            initialParams={{}}
          />
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
