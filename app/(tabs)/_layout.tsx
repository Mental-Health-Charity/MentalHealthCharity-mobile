import { Tabs } from "expo-router";
import Home from "./Home";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="Home"></Tabs.Screen>
      <Tabs.Screen name="Chat"></Tabs.Screen>
      <Tabs.Screen name="Profile"></Tabs.Screen>
      <Tabs.Screen name="Post"></Tabs.Screen>
    </Tabs>
  );
};
