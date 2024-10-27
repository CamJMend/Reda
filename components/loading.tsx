import { View, Text } from "react-native";

export default function Loading() {
    return (
        <View className="w-screen h-screen flex flex-col justify-center items-center">
            <Text className="text-2xl">Loading...</Text>
        </View>
    );
}