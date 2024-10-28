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
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="user/data"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="main"
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack>
    )
}