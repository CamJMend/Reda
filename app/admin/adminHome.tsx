import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

export default function AdminHome() {
    return (
        <ScrollView className="flex-1 w-full bg-white">
            <View className="items-center">
                <Text>Admin Home</Text>
            </View>
        </ScrollView>
    )
}