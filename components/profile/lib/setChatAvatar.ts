import axios from "axios";
import { getCookiesAuth } from "../../../app/utils/cookies";

export const setChatAvatar = async (uri: string) => {
  const headers = await getCookiesAuth();

  const res = await axios.post(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/v1/user/chat-avatar`,
    uri,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${headers?.jwtToken}, ${headers?.jwtTokenType}`,
      },
    }
  );
};
