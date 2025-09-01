import { useAuth0 } from "react-native-auth0";
import { Button, ButtonText } from '@/components/ui/button';
import { useColorScheme } from "react-native";
import { View, SafeAreaView } from "react-native";
import { useAppStore } from "@/store/useAppStore";
import { router } from "expo-router";

const Login = () => {
    const colorScheme = useColorScheme();
    const { authorize, user } = useAuth0();
    const { setAuth, setUserName, setUserEmail } = useAppStore();

    const handlePress = async () => {
        try {
            const credentials = await authorize();

            if (credentials?.accessToken) {
                await setUserName(user?.name ?? '');
                await setUserEmail(user?.email ?? '');
                await setAuth(true, credentials?.accessToken);

                // Redirect to home
                router.replace('/');
            } else {
                console.log("Login failed or was cancelled:", credentials);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
            <Button className="m-3" onPress={handlePress}>
                <ButtonText>Login</ButtonText>
            </Button>
        </SafeAreaView>)
}

export default Login;