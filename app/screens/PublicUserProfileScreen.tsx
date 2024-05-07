import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import getProfile, { PublicProfileData } from "../utils/getProfile";
import { PublicProfile, useAuth } from "../contexts/authContext";
import { useRoute } from "@react-navigation/native";
import BlogCard from "../../components/blog/blogCard";

interface UserProfileProps {
  id: number;
}

const PublicUserProfile = (props: UserProfileProps) => {
  const route = useRoute();
  const { id } = route.params as UserProfileProps;
  const [profile, setProfile] = useState<PublicProfileData>();
  const [error, setError] = useState(false);

  const getPublicProfile = async (id: number) => {
    try {
      const fetchedProfile = await getProfile(id);
      setProfile(fetchedProfile);
    } catch (err) {
      console.error("error while downloading public profile", err);
      setError(true);
    }
  };

  useEffect(() => {
    getPublicProfile(id);
  }, []);

  if (error || !profile?.user) {
    return (
      <View className="flex items-center justify-center m-auto">
        <Text className="text-xl font-bold text-black">
          Wystąpił błąd! Profil nie istnieje.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex flex-col items-center px-4 py-1 gap-5  text-center min-h-[90vh] rounded-xl box">
      <Image
        className="absolute w-full h-full"
        source={require("../../assets/herowave.png")}
      />
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
          <Text className="mt-10 text-base font-normal ">
            {profile.description}
          </Text>
        </View>
      </View>
      {/* <BlogCard banner_url={}  /> */}
    </View>
  );
};

export default PublicUserProfile;
