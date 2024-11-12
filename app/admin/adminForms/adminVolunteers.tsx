import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { collection, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../components/initApp";

export default function AdminVolunteers({ onSelectVolunteers }: { onSelectVolunteers: (volunteers: any) => void }) {
    const [volunteers, setVolunteers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVolunteers = async () => {
        try {
            const q = query(collection(db, "forms_volunteers"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const volunteersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVolunteers(volunteersList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching volunteers: ", error);
            Alert.alert("Error", "Hubo un problema al cargar los aliados.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "to_do":
                return "bg-red-500";
            case "en_proceso":
                return "bg-yellow-500";
            case "completado":
                return "bg-green-500";
            default:
                return "bg-gray-400";
        }
    };

    const renderVolunteers = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => onSelectVolunteers(item)}
            className="mt-2 p-3 bg-gray-100 rounded-lg flex-row items-center"
        >
            {/* Círculo de estado */}
            <View className={`w-4 h-4 rounded-full mr-3 ${getStatusColor(item.status)}`} />
            {/* Nombre del ítem */}
            <Text className="text-lg font-regular">{item.nombre}</Text>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800 pb-2">Voluntarios</Text>
            {loading ? (
                <Text className="text-base mt-3">Cargando Voluntarios...</Text>
            ) : (
                <FlatList
                    data={volunteers}
                    renderItem={renderVolunteers}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}
