import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { collection, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../components/initApp";

export default function AdminAllies({ onSelectAlly }: { onSelectAlly: (ally: any) => void }) {
    const [allies, setAllies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAllies = async () => {
        try {
            const q = query(collection(db, "forms_allies"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const alliesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAllies(alliesList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching allies: ", error);
            Alert.alert("Error", "Hubo un problema al cargar los aliados.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllies();
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

    const renderAlly = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => onSelectAlly(item)}
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
            <Text className="text-2xl font-bold text-gray-800 pb-2">Aliados</Text>
            {loading ? (
                <Text className="text-base mt-3">Cargando aliados...</Text>
            ) : (
                <FlatList
                    data={allies}
                    renderItem={renderAlly}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}
