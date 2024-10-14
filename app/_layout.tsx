import { Stack } from "expo-router";

export default function App() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
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
                name="main"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}