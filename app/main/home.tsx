import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

export default function Home({ userID, userData, docID } : any) {
    return (
        <ScrollView className="flex-1 w-full bg-white">
            <View className="items-center">
                <Text>{userData.name ? userData.name : ""}</Text>
            </View>
        </ScrollView>
    )
}