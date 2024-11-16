import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../components/initApp";

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState<any>()

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const userID = user.uid;
                    setUserID(user)

                    const notifDocRef = doc(db, "notifications", userID);
                    const notifDocSnap = await getDoc(notifDocRef);

                    if (notifDocSnap.exists()) {
                        const rawData = notifDocSnap.data();
                        console.log(rawData)

                        const transformedNotifications = Object.entries(rawData.notifications)
                            .filter(([key]) => key.startsWith("notif_"))
                            .map(([id, notifData]: any) => ({
                                id,
                                ...notifData,
                            }));

                        setNotifications(transformedNotifications);
                        console.log(transformedNotifications)
                    } else {
                        console.log("No se encontraron notificaciones para este usuario.");
                        setNotifications([]);
                    }
                }
            } catch (error) {
                console.error("Error obteniendo las notificaciones: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleNotificationPress = async (notif: any) => {
        try {
            const notificationDoc = doc(db, "notifications", userID);
            await updateDoc(notificationDoc, {
                [`notifications.${notif.id}.status`]: "seen",
            });

            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === notif.id ? { ...n, status: "seen" } : n
                )
            );
        } catch (error) {
            console.error("Error al actualizar la notificación:", error);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 w-full bg-white">
            <View className="items-center my-4">
                <Text className="text-xl font-bold">Notificaciones</Text>
            </View>
            {notifications.length > 0 ? (
                notifications.map((notif) => (
                    <TouchableOpacity
                        key={notif.id}
                        onPress={() => handleNotificationPress(notif)}
                        className="p-4 border-b border-gray-200 mx-6 flex-row items-center"
                    >
                        {/* Indicador de estado */}
                        <View
                            className={`w-3 h-3 rounded-full mr-4 ${
                                notif.status === "unseen" ? "bg-blue-500" : "bg-gray-400"
                            }`}
                        ></View>

                        {/* Contenido de la notificación */}
                        <View className="flex-1">
                            <Text className="font-bold text-lg">{notif.subject}</Text>
                            <Text className="text-gray-700" numberOfLines={1}>
                                {notif.message}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))
            ) : (
                <View className="items-center my-4">
                    <Text className="text-gray-500">No tienes notificaciones.</Text>
                </View>
            )}
        </ScrollView>
    );
}
