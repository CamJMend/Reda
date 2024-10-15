import { Stack } from "expo-router";

export default function Main() {
    return (
        <Stack>
            <Stack.Screen
                name="home"
                options={{
                    headerShown: false,
                    animation: "none",
                }}
            />
            <Stack.Screen
                name="map"
                options={{
                    headerShown: false,
                    animation: "none",
                }}
            />
        </Stack>
    )
}