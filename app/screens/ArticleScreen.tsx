import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Article, ArticleItem, getArticle } from "../utils/getArticles";
import Video from "react-native-video";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../components/Router";
import Markdown from "react-native-markdown-display";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../contexts/authContext";
import { Status } from "../contexts/adminContext";
import PrimaryButton from "../../components/common/PrimaryButton";

type PublicProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "PublicUserProfileScreen"
>;
interface ArticleProps {
  id: number;
}

const ArticleScreen = (props: ArticleProps) => {
  const { user } = useAuth();
  const navigation = useNavigation<PublicProfileScreenNavigationProp>();
  const route = useRoute();
  const [status, setStatus] = useState<Status>(Status.PUBLISHED);
  const statusOptions = Object.values(Status);
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
  const changeArticleStatus = (status: Status) => {
    setStatus(status);
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
      {user?.user_role !== "User" && (
        <View className="gap-3 my-10 ">
          <Text className="font-semibold ">Zmień status</Text>
          <Picker
            selectedValue={status}
            onValueChange={(status) => changeArticleStatus(status as Status)}
            className="mt-5"
          >
            {statusOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
          <PrimaryButton
            title="Zatwierdź"
            onPress={() => {
              console.log("Zatwierdź");
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ArticleScreen;
