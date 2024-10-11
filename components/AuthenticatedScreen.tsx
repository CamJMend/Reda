import { View, Text, Button } from "react-native";

export default function AuthenticatedScreen({ user, handleAuthentication } : any) {
    return (
        <View className='w-4/5 w-max-md bg-slate-50 p-4 rounded-lg'>
            <Text className='text-2xl mb-4 text-center'>Welcome</Text>
            <Text className='text-lg text-center mb-5'>{user.email}</Text>
            <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
        </View>
    );
};