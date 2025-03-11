import axios from "axios";
import { User } from "../contexts/authContext";
import { getCookiesAuth } from "./cookies";
export interface PublicProfileData {
  avatar_url: string;
  description: string;
  id: number;
  user: User;
}

export const getProfile = async (id: number) => {
  try {
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/user-public-profile/${id}`
    );

    const data: PublicProfileData = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("Błąd: ", error);
  }
};

export default getProfile;
