import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "../contexts/authContext";

type Props = {};

const Home = (props: Props) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
