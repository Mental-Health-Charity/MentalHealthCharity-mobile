import { Tabs, Redirect, Stack } from "expo-router";
import Home from "./Home";
import { useAuth } from "../contexts/authContext";

export default () => {
  const user = useAuth();

  if (!user) {
    return <Redirect href={"(auth)/Login"} />;
  } else {
    return (
      <Tabs>
        <Tabs.Screen name="Home"></Tabs.Screen>
        <Tabs.Screen name="Chat"></Tabs.Screen>
        <Tabs.Screen name="Post"></Tabs.Screen>
        <Tabs.Screen name="Profile"></Tabs.Screen>
      </Tabs>
    );
  }
};
