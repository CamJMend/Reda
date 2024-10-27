import { View, Text } from "react-native";


export default function Error404() {
    return (
        <View className="flex flex-col items-center justify-center h-screen">
            <Text className="text-4xl font-bold">404</Text>
            <Text className="text-2xl">Page not found</Text>
        </View>
    )
}