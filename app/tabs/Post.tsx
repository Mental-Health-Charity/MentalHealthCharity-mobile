import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Article,
  Articles,
  getArticle,
  getVolunteerCourses,
} from "../utils/getArticles";
import BlogCard from "../../components/blog/blogCard";

type Props = {};

const Post = (props: Props) => {
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
          <TouchableOpacity>
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

export default Post;
