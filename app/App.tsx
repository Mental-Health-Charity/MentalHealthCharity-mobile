import { AuthProvider, User } from "./contexts/authContext";
import Router from "../components/Router";
import { restoreUserSession } from "./utils/cookies";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const verify = async () => {
    try {
      setIsLoading(true);
      const restoredData = await restoreUserSession();
      setUser(restoredData);
    } catch (err) {
      console.error("err", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthProvider user={user}>
      <Router />
    </AuthProvider>
  );
};

export default App;

// PluginError: Failed to resolve plugin for module "expo-router" relative to "C:\GitHub repos\MentalHealthCharity-mobile"
// PluginError: Failed to resolve plugin for module "expo-router" relative to "C:\GitHub repos\MentalHealthCharity-mobile"
//     at resolvePluginForModule (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config-plugins\build\utils\plugin-resolver.js:72:11)
//     at resolveConfigPluginFunctionWithInfo (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config-plugins\build\utils\plugin-resolver.js:152:7)
//     at resolveConfigPluginFunction (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config-plugins\build\utils\plugin-resolver.js:143:7)
//     at withStaticPlugin (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config-plugins\build\plugins\withStaticPlugin.js:87:70)
//     at C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config-plugins\build\plugins\withPlugins.js:30:84
//     at Array.reduce (<anonymous>)
//     at withPlugins (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config-plugins\build\plugins\withPlugins.js:30:18)
//     at withConfigPlugins (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config\build\plugins\withConfigPlugins.js:36:47)
//     at fillAndReturnConfig (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config\build\Config.js:217:78)
//     at getConfig (C:\GitHub repos\MentalHealthCharity-mobile\node_modules\@expo\config\build\Config.js:272:10)
