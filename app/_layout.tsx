import { Stack } from "expo-router";

export default function App() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="login/[id]"
                options={{
                    headerShown: false,
                    animation: "fade",
                    animationDuration: 300,
                }}
            />
            <Stack.Screen
                name="main/mainScreen"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="main/notificationsScreen"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="admin/adminMainScreen"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack>
    )
}