import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Article,
  Articles,
  getArticle,
  getVolunteerCourses,
} from "../utils/getArticles";
import BlogCard from "../../components/blog/blogCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../components/Router";

type ArticleScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "ArticleScreen"
>;

type Props = { navigation: any };

const Posts = ({ navigation }: Props) => {
  const [articles, setArtiicles] = useState<Articles>();
  const [loading, setLoading] = useState(true);

  const getAllArticles = async (page: number) => {
    try {
      const fetchedArticles = await getVolunteerCourses(page, 15);
      setArtiicles(fetchedArticles);
      setLoading(false);
    } catch (error) {
      console.log("Error while loading articles, error details ", error);
    }
  };

  useEffect(() => {
    getAllArticles(1);
  }, []);

  const articlesArray = articles?.items || [];

  return (
    <View>
      <FlatList
        data={articlesArray}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ArticleScreen", { id: item.id })
            }
          >
            <BlogCard
              banner_url="https://i.imgur.com/5DLmMPL.jpeg"
              date={item.creation_date}
              authorName={item.created_by.username}
              title={item.title}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Posts;
