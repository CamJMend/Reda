import { View, Text, Pressable, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";


export default function Home() {
    const { user } = useLocalSearchParams()

    const handleLogOut = () => {
        router.push('/login/3')
    }

    return (
        <ScrollView>
            <View className="grow justify-center items-center">
                <Text>Home</Text>
                <Text>{user}</Text>
                <Pressable className="px-6 py-3 bg-red-500 rounded-full" onPress={handleLogOut}>
                    <Text className="text-white">Log Out</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}