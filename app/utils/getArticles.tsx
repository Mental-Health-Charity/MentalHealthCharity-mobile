import axios from "axios";
import { User } from "../contexts/authContext";
import { getCookiesAuth } from "./cookies";

export interface Article {
  title: string;
  content: string;
  banner_url: string;
  id: number;
  created_by: User;
  creation_date: string;
}

export interface Articles {
  items: Article[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const getArticle = async (page: number, size: number) => {
  try {
    const headers = await getCookiesAuth();
    console.log(headers);
    const res = await axios.get(
      `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/?page=${page}&size=${size}`,
      { headers: { Authorization: `${headers}` } }
    );
    const data: Article = res.data;
    return data;
  } catch (error) {
    console.log("Błąd w pobieraniu danych", error);
  }
};

export const getVolunteerCourses = async (page: number, size: number) => {
  const headers = await getCookiesAuth();

  const res = await axios.get(
    `https://mentalhealthcharity-backend-production.up.railway.app/api/v1/article/?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${headers?.jwtToken}`,
        "Content-Type": headers?.jwtTokenType,
      },
    }
  );

  const data: Articles = await res.data;
  console.log(data);
  return data;
};
