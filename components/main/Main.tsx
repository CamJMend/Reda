import { View, Text, Button } from "react-native";
import { signOut } from "@react-native-firebase/auth";

export default function Main({ navigation, route } : any) {
    const { email, auth } = route.params;

    const handleLogOut = async () => {
        console.log('User logged out successfully!');
        await signOut(auth);
        navigation.navigate("Login")
    }

    return (
        <View className='grow justify-center items-center p-4 bg-[#f0f0f0]'>
            <View className='w-4/5 w-max-md bg-slate-50 p-4 rounded-lg'>
                <Text className='text-2xl mb-4 text-center'>Welcome</Text>
                <Text className='text-lg text-center mb-5'>{email}</Text>
                <Button
                    title="Logout"
                    onPress={handleLogOut}
                    color="#e74c3c"
                />
            </View>
        </View>
    );
};