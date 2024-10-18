import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MainHeader({screenName} : any) {
    return (
        <LinearGradient
            colors={['#074F40', 'rgba(255,255,255,1)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full h-[17%] flex flex-row items-center justify-around pt-10"
        >
            <MaterialIcons name="account-circle" size={56} color="white" />
            <View className="h-14 w-20 justify-end items-center">
                <Text className="text-white font-bold">{screenName}</Text>
            </View>
            <MaterialIcons name="notifications" size={56} color="white" />
        </LinearGradient>
    )
}