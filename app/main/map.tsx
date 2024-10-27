import { View } from "react-native";
import MapView from 'react-native-maps';

export default function Map({ userID, userData, docID } : any) {
    return (
        <View className="w-full h-[70.5%]">
            <MapView className="w-full h-full" />
        </View>
    )
}