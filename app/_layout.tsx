import { Redirect, Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {Auth0Provider} from 'react-native-auth0';
import { useAppStore } from "@/store/useAppStore";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const {isAuthenticated} = useAppStore();
  return (
   <GluestackUIProvider mode="system">
      <Auth0Provider
        domain="dev-akira-shinsa.us.auth0.com"
        clientId="sPa10J3M1imLEe7UP4OQF9e0NUhK8uCS"
      >
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login/index" />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="Github/index"/>
          </Stack>

          {/* Redirect after stack mounts */}
          {!isAuthenticated ? <Redirect href="/login" /> : null}
        </SafeAreaProvider>
      </Auth0Provider>
    </GluestackUIProvider>
  );
}
