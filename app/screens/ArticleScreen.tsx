import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Article, ArticleItem, getArticle } from "../utils/getArticles";

interface Props {}

const ArticleScreen = ({}: Props) => {
  const route = useRoute();
  const [article, setArticle] = useState<ArticleItem>();
  const { articleId } = (route.params as { articleId: any }).articleId;

  const getSingleArticle = async (id: string) => {
    try {
      const fetchedArticle = await getArticle(id);
      setArticle(fetchedArticle);
      console.log(article);
    } catch (error) {
      console.log("Błąd w pobieraniu danych");
    }
  };

  useEffect(() => {
    getSingleArticle(articleId);
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ArticleScreen;
