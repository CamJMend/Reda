import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function Loading() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <View className="w-screen h-screen flex flex-col justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#1D4B40" />
                <Text className="text-md mt-4">Cargando...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Text>Contenido cargado</Text>
        </View>
    );
}
