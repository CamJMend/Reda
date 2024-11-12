import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../components/initApp";

interface DetailsProps {
    data: any;
    type: string;
    onStatusChange: (newStatus: string) => void;
}

export default function Details({ data, type, onStatusChange }: DetailsProps) {

    const getCollectionReference = () => {
        switch (type) {
            case "ally":
                return "forms_allies";
            case "volunteer":
                return "forms_volunteers";
            case "inneed":
                return "forms_inneed";
            default:
                return "";
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        try {
            const collection = getCollectionReference(); 
            const docRef = doc(db, collection, data.id);
            await updateDoc(docRef, {
                status: newStatus,
            });
            onStatusChange(newStatus);
            Alert.alert("Éxito", `Estado cambiado a: ${newStatus}`);
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
            Alert.alert("Error", "No se pudo actualizar el estado.");
        }
    };

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

    return (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-2xl font-bold mb-5">Detalles</Text>
                    <View className={`w-4 h-4 rounded-full mb-6 ${getStatusColor(data.status)}`} />
                </View>
                    
                    {/* Tablita con datos */}
                    <View className="mb-4">
                        <View className="flex-row justify-between border-b border-gray-300 pb-2">
                            <Text className="text-base font-semibold mr-3">Nombre:</Text>
                            <Text className="text-base">{data.nombre}</Text>
                        </View>
                        <View className="flex-row justify-between border-b border-gray-300 py-2">
                            <Text className="text-base font-semibold mr-3">Correo:</Text>
                            <Text className="text-base">{data.correo}</Text>
                        </View>
                        <View className="flex-row justify-between border-b border-gray-300 py-2">
                            <Text className="text-base font-semibold mr-3">Teléfono:</Text>
                            <Text className="text-base">{data.telefono}</Text>
                        </View>
                        <View className="flex-row justify-between border-b border-gray-300 py-2">
                            <Text className="text-base font-semibold mr-3">Ciudad:</Text>
                            <Text className="text-base">{data.ciudad}</Text>
                        </View>

                        {/* Datos específicos para el tipo */}
                        {type === "ally" && (
                            <>
                                <View className="flex-row justify-between border-b border-gray-300 py-2">
                                    <Text className="text-base font-semibold mr-3">Empresa:</Text>
                                    <Text className="text-base">{data.empresa}</Text>
                                </View>
                                <View className="flex-column justify-begin border-b border-gray-300 py-2">
                                    <Text className="text-base font-semibold mr-3">Servicios:</Text>
                                    <Text className="text-base text-justify">{data.servicios}</Text>
                                </View>
                            </>
                        )}

                        {type === "volunteer" && (
                            <>
                                <View className="flex-column justify-begin border-b border-gray-300 py-2">
                                    <Text className="text-base font-semibold mr-3">Disponibilidad:</Text>
                                    <Text className="text-base text-justify">{data.fechasDisponibilidad}</Text>
                                </View>
                                <View className="flex-column justify-begin border-b border-gray-300 py-2">
                                    <Text className="text-base font-semibold mr-3">Mensaje:</Text>
                                    <Text className="text-base text-justify">{data.mensaje}</Text>
                                </View>
                            </>
                        )}

                        {type === "inneed" && (
                            <>
                                <View className="flex-column justify-begin border-b border-gray-300 py-2">
                                    <Text className="text-base font-semibold mr-3">Mensaje:</Text>
                                    <Text className="text-base text-justify">{data.mensaje}</Text>
                                </View>
                            </>
                        )}

                        {/* Estado con bolita a la derecha */}
                        <View className="flex-row justify-between border-b border-gray-300 py-2">
                            <Text className="text-base font-semibold mr-3">Status:</Text>
                            <TouchableOpacity onPress={() => handleStatusChange("to_do")}>
                                <Text className="text-base">{data.status}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text className="text-2xl font-bold mb-5 mt-5">Responder</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
