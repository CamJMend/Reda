import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function NotificationsScreen() {
    return (
        <ScrollView className="flex-1 w-full bg-white">
            <View className="items-center">
                <Text className="text-xl font-bold">Notificaciones</Text>
                {/* Aquí puedes agregar el contenido de tus notificaciones */}
            </View>
        </ScrollView>
    );
}
