import { View, Text, TextInput, Button } from "react-native";

export default function AuthScreen({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication, cambio } : any) {
    return (
        <View className='w-4/5 w-max-md bg-slate-50 p-4 rounded-lg'>
            <Text className='text-2xl mb-4 text-center'>{isLogin ? 'Log In' : 'Sign Up'}</Text>
            <Text className='text-2xl mb-4 text-center'>{cambio}</Text>
            <TextInput
                className='h-10 border-[#ddd] border mb-4 p-2 rounded'
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                className='h-10 border-[#ddd] border mb-4 p-2 rounded'
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />
            <View className='mb-4'>
                <Button title={isLogin ? 'Log In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
            </View>
            <View className='mb-4'>
                <Text className=' text-[#3498db] text-center' onPress={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
                </Text>
            </View>
        </View>
    );
}