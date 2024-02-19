import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { User } from "../../app/contexts/authContext";

type Props = {
  //image: string;
  //isApproved: string;
  banner_url: string;
  date: string;
  authorName: string;
  title: string;
};

const BlogCard = (props: Props) => {
  const { date, banner_url, authorName, title } = props;
  return (
    <View className="flex-1 m-3 overflow-hidden border rounded-xl ">
      <View className="relative flex-1">
        <Image
          source={{ uri: banner_url }}
          style={{ width: 350, height: 215 }}
          resizeMode="cover"
          className="justify-end flex-1"
        />
        <View className="absolute px-3 py-2 bg-gray-400 top-3 right-3 rounded-xl">
          <Text className="text-white">Zatwierdzony</Text>
        </View>
      </View>
      <View className="flex flex-row items-center p-3 bg-slate-200 ">
        {/* <Image
          source={{ uri: }}
          className="w-12 h-12 mr-3 rounded-3xl"
        /> */}
        <View className="flex-1">
          <Text className="text-xs text-gray-400">{date}</Text>
          <Text className="font-bold text-black text-s">{authorName}</Text>
          <Text className="mt-5 text-base">{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default BlogCard;
