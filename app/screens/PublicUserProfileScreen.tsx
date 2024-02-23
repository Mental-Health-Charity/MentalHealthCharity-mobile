import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import getProfile, { PublicProfileData } from "../utils/getProfile";
import { PublicProfile, useAuth } from "../contexts/authContext";
import { useRoute } from "@react-navigation/native";

interface UserProfileProps {
  id: number;
}

const PublicUserProfile = ({ id }: UserProfileProps) => {
  const route = useRoute();
  const { userId } = (route.params as { userId: any }).userId;
  const [profile, setProfile] = useState<PublicProfileData>();
  const [error, setError] = useState(false);

  const getPublicProfile = async () => {
    try {
      const profile = await getProfile(userId);
      setProfile(profile);
    } catch (err) {
      console.error("error while downloading public profile", err);
      setError(true);
    }
  };

  useEffect(() => {
    getPublicProfile();
  }, []);

  if (error || !profile?.user) {
    return (
      <View className="absolute top-0 left-0 block w-full bg-repeat bg-cover opacity-50 h-4/6 -z-10">
        <Text>Wystąpił błąd! Profil nie istnieje.</Text>
      </View>
    );
  }

  return (
    <View className="flex flex-col items-center px-4 py-1 gap-5  text-center min-h-[90vh] rounded-xl box">
      <View className="flex flex-col w-[70%]">
        <Text className="w-full text-start">Profil użytkownika</Text>
        <View className="flex flex-wrap w-full ">
          <Image
            source={
              profile.avatar_url
                ? { uri: profile.avatar_url }
                : require("../../assets/user.png")
            }
            className="rounded-full max-w-[5.5em] max-h-[5em] w-fit mr-1 overflow-hidden "
          />

          <Text className="">{profile.user.full_name}</Text>
          <Text>{profile.user.user_role}</Text>
          <Text className=" text-base font-normal mt-10">I am description</Text>
        </View>
      </View>
    </View>
  );
};

export default PublicUserProfile;
