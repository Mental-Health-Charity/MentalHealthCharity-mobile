import axios from "axios";
import { User } from "../contexts/authContext";
export interface PublicProfileData {
  avatar_url: string;
  description: string;
  id: number;
  user: User;
}

export const getProfile = async (id: number) => {
  const res = await axios.get(
    `${process.env.EXPO_PUBLIC__BASE_URL}/api/v1/user-public-profile/${id}`
  );

  const data: PublicProfileData = res.data;
  return data;
};

export default getProfile;
