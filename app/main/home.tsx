import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

export default function Home({ userID, userData, docID } : any) {

    const handleLogOut = () => {
        router.navigate('/');
    }

    const handleShowData = () => {
        console.log(userID);
        console.log(docID);
        console.log(userData);
    }

    return (
        <ScrollView className="flex-1 w-full bg-white">
            <View className="items-center">
                <Text>{userData.name ? userData.name : ""}</Text>
                <Pressable className="px-6 py-3 rounded-full mt-10 bg-green-500 active:bg-[#1e9e1a49] " onPress={handleShowData}>
                    <Text className="text-white">Show </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}