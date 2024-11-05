import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function Loading() {

    return (
        <View className="w-screen h-screen flex flex-col justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#1D4B40" />
            <Text className="text-md mt-4">Cargando...</Text>
        </View>
    );
}
