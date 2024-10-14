import { Stack } from "expo-router";

export default function Main() {
    return (
        <Stack>
            <Stack.Screen
                name="home"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    )
}