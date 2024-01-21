import { Slot, Stack, useRouter } from "expo-router";
import { AuthProvider, User, useAuth } from "./contexts/authContext";
import { restoreUserSession } from "./utils/cookies";
import { useEffect } from "react";

export default function Root() {
  const user = restoreUserSession();
  return (
    <AuthProvider user={null}>
      <Slot />
    </AuthProvider>
  );
}
