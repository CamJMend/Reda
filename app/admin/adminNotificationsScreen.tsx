import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function AdminNotificationsScreen() {
    return (
        <ScrollView className="flex-1 w-full bg-white">
            <View className="items-center">
                <Text className="text-xl font-bold">Notificaciones</Text>
            </View>
        </ScrollView>
    );
}
