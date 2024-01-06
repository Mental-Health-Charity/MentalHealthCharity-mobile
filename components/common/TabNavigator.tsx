import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "../../app/Login";
import Chat from "../../app/(tabs)/Chat";
import Post from "../../app/(tabs)/Post";
import Profile from "../../app/(tabs)/Profile";

type Props = {};

const Tab = createBottomTabNavigator();

const TabNavigator = (props: Props) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: "white",
        borderRadius: 15,
        height: 90,
      }}
    >
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
