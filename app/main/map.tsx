import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ userID, userData, docID } : any) {
    const [showCenterData, setShowCenterData] = useState(false);
    const [centerSelected, setCenterSelected] = useState(0);
    const [origin, setOrigin] = useState({
        latitude: 20.6604443,
        longitude: -103.3337275
    });

    const aidCenters = [
        {
            title: "Instituto Tecnológico y de Estudios Superiores de Monterrey",
            direction: "Av. Gral Ramón Corona No 2514, Colonia Nuevo México, 45201 Zapopan, Jal.",
            description: "Campus Guadalajara",
            coordinate: {
                latitude: 20.732422930651143,
                longitude: -103.45414163440157
            }
        },
        {
            title: "JAPI",
            direction: "Av. Central Guillermo Gonzalez Camarena 750, Residencial Poniente, 45136 Zapopan, Jal.",
            description: "Paseo Interactivo",
            coordinate: {
                latitude: 20.72286114159556,
                longitude: -103.43130300236946
            }
        }
    ]

    const handleSelectCenter = (index: number) => {
        setCenterSelected(index);
        setShowCenterData(true);
    }

    return (
        <View className="relative grow w-full">
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
                {aidCenters.map((center, index) => {
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