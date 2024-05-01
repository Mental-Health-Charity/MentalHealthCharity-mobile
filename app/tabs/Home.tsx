import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Article,
  Articles,
  getArticle,
  getArticles,
  getVolunteerCourses,
} from "../utils/getArticles";
import BlogCard from "../../components/blog/blogCard";
import Roles from "../utils/roles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../components/Router";
import { useAuth } from "../contexts/authContext";
import ArticleStatusButton from "../../components/common/ArticleStatusButton";
import { Status } from "../contexts/adminContext";
type ArticleScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "ArticleScreen"
>;

type Props = {};

const Posts = (props: Props) => {
  const navigation = useNavigation<ArticleScreenNavigationProp>();
  const { user } = useAuth();
  const [articles, setArtiicles] = useState<Articles>();
  const [statusOfArticles, setStatusOfArticles] = useState<Status>(
    Status.PUBLISHED
  );
  const [loading, setLoading] = useState(true);

  const getAllArticles = async (page: number) => {
    try {
      let status = statusOfArticles || Status.PUBLISHED;
      const fetchedArticles = await getArticles(page, 15, status);
      setArtiicles(fetchedArticles);
      setLoading(false);
    } catch (error) {
      console.log("Error while loading articles, error details ", error);
    }
  };

  useEffect(() => {
    getAllArticles(1);
  }, [statusOfArticles]);

  const loadArticles = () => {
    if (!loading && articles && articles?.items.length > 0) {
      return (
        <FlatList
          data={articles.items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ArticleScreen", { id: item.id });
              }}
            >
              <BlogCard
                banner_url={item.banner_url}
                date={item.creation_date}
                status={item.status}
                authorName={item.created_by.full_name}
                image={item.created_by.avatar_url}
                title={item.title}
              />
            </TouchableOpacity>
          )}
        />
      );
    } else {
      return (
        <Text className="my-[50%] text-center font-semibold text-lg">
          Brak wyników do wyświetlenia
        </Text>
      );
    }
  };

  return (
    <>
      <View>
        {user?.user_role === Roles.admin ||
        user?.user_role === Roles.supervisor ||
        user?.user_role === Roles.coordinator ||
        user?.user_role === Roles.redactor ? (
          <FlatList
            className="px-3 py-3 m-4"
            horizontal
            keyExtractor={(item, index) => index.toString()}
            data={Object.values(Status)}
            renderItem={({ item }) => (
              <ArticleStatusButton
                status={item}
                onPress={() => {
                  setStatusOfArticles(item);
                  console.log("Status: ", statusOfArticles);
                }}
              />
            )}
          />
        ) : null}
      </View>
      <View>{loadArticles()}</View>
    </>
  );
};

export default Posts;
