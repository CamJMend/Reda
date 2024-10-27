import { Stack } from "expo-router";

export default function Main() {
    return (
        <Stack>
            <Stack.Screen
                name="mainScreen"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
