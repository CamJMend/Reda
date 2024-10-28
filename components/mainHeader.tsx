import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MainHeader({screenName} : any) {
    return (
        <LinearGradient
            colors={['#1D4B40', '#FFF']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full pt-10 pb-10 flex flex-row items-center justify-around"
        >
            <MaterialIcons name="account-circle" size={45} color="white" />
            <View className="h-14 w-24 justify-end items-center">
                <Text className="text-white font-bold">{screenName}</Text>
            </View>
            <MaterialIcons name="notifications" size={45} color="white" />
        </LinearGradient>
    )
}