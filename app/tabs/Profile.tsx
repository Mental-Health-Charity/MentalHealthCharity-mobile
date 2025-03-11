import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import getProfile from "../utils/getProfile";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useAuth();
  const [showPublicProfile, setShowPublicProfile] = useState(false);

  const canAccesPublicProfile = async (id: number) => {
    const profile = await getProfile(id);
    console.log(profile);
    if (profile) {
      setShowPublicProfile(true);
    } else {
      setShowPublicProfile(false);
    }
  };
  useEffect(() => {
    canAccesPublicProfile(user?.id as number);
  }, []);
  console.log(showPublicProfile);
  return (
    <View className="flex bg-[#f3f7fe]">
      {!showPublicProfile ? (
        <Text className="my-[50%] text-center font-semibold text-lg">
          Użytkownik nie ma profilu publicznego
        </Text>
      ) : (
        <>
          <Text></Text>
          <Text>Settings</Text>
        </>
      )}
    </View>
  );
};

export default Profile;
