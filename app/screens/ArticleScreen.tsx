import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Article, ArticleItem, getArticle } from "../utils/getArticles";
import Video from "react-native-video";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../components/Router";
import Markdown from "react-native-markdown-display";

type PublicProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "PublicUserProfileScreen"
>;
interface ArticleProps {
  id: number;
}

const ArticleScreen = (props: ArticleProps) => {
  const navigation = useNavigation<PublicProfileScreenNavigationProp>();
  const route = useRoute();
  const [article, setArticle] = useState<Article>();
  const { id } = route.params as ArticleProps;

  const getSingleArticle = async (id: any) => {
    try {
      const fetchedArticle = await getArticle(id);
      setArticle(fetchedArticle);
    } catch (error) {
      console.log("Błąd w pobieraniu danych");
    }
  };

  useEffect(() => {
    getSingleArticle(id);
  }, []);

  return (
    <ScrollView className="p-5 mb-5 overflow-y-auto">
      <Text className="mt-10 text-slate-500">{article?.creation_date}</Text>
      <Text className="mt-5 text-3xl font-bold">{article?.title}</Text>
      <TouchableOpacity
        className="flex flex-row items-center mt-8"
        onPress={() => {
          navigation.navigate("PublicUserProfileScreen", {
            id: article?.created_by.id,
          });
        }}
      >
        <Image
          source={
            article?.created_by.avatar_url
              ? { uri: article?.created_by.avatar_url }
              : require("../../assets/user.png")
          }
          className="w-16 h-16 mr-3 rounded-3xl"
        />
        <View>
          <Text className="text-2xl font-bold text-emerald-800">
            {article?.created_by.full_name}
          </Text>
          <Text className="text-slate-500">
            {article?.created_by.user_role}
          </Text>
        </View>
      </TouchableOpacity>
      <Image
        className="w-full mt-5 h-72"
        resizeMode="contain"
        source={
          article?.banner_url
            ? { uri: article.banner_url }
            : require("../../assets/user.png")
        }
      />

      <Markdown>{article?.content}</Markdown>
    </ScrollView>
  );
};

export default ArticleScreen;
