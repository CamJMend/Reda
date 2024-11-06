import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

export default function MainHeader({ screenName, setScreen, setScreenName, showLogOut, setShowLogOut }: any) {
    const toggleLogOut = () => {
        setShowLogOut(!showLogOut);
    }

    const handleNotificationPress = () => {
        setScreen('notifications')
        setScreenName('Notificaciones')
    }

    return (
        <LinearGradient
            colors={['#1D4B40', '#FFF']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full pt-12 pb-14 flex flex-col items-center"
        >
            <View className="flex flex-row items-center justify-around w-full">
                <Pressable onPress={toggleLogOut}>
                    <MaterialIcons name="account-circle" size={45} color="white" />
                </Pressable>

                <View className="h-14 w-28 justify-end items-center">
                    <Text className="text-white font-bold">{screenName}</Text>
                </View>

                <Pressable onPress={screenName == 'Notificaciones' ? ()=>{return} : handleNotificationPress}>
                    <MaterialIcons name="notifications" size={45} color="white" />
                </Pressable>
            </View>
        </LinearGradient>
    );
}
