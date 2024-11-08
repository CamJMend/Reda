import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function AdminMap({ aidCenters } : any) {
    const [showCenterData, setShowCenterData] = useState(false);
    const [centerSelected, setCenterSelected] = useState(0);
    const [origin, setOrigin] = useState({
        latitude: 20.6604443,
        longitude: -103.3337275
    });

    const handleSelectCenter = (index: number) => {
        setCenterSelected(index);
        setShowCenterData(true);
    }

    return (
        <View className="relative flex-1 w-full">
            {/* Center Card */}
            {showCenterData ? 
                <Pressable className="absolute w-full h-full z-10 flex flex-col items-center justify-center bg-[#00000038]" onPress={()=>setShowCenterData(false)}>
                    <Pressable className="w-[80%] p-5 border-4 rounded-3xl border-orange-300 bg-white">
                        <Text className="text-center text-lg font-bold pt text-orange-400">{aidCenters[centerSelected].title}</Text>
                        <Text className="mt-3 text-xs text-gray-900">{aidCenters[centerSelected].direction}</Text>
                        <Text className="mt-2 text-sm font-bold">Informacion sobre el punto de apoyo:</Text>
                        <Text className="mt-2 text-sm">{aidCenters[centerSelected].description}</Text>
                    </Pressable>
                </Pressable>
            : null}

            {/* Map */}
            <MapView
                className="absolute w-full h-full z-0"
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.3,
                    longitudeDelta: 0.3
                }}
            >
                {aidCenters.map((center:any, index:any) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={center.coordinate}
                            onPress={() => {handleSelectCenter(index)}}
                        />
                    )
                })}
            </MapView>
        </View>
    )
}