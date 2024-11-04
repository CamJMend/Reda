import { View, Text, TextInput, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../components/initApp";

export default function Allies({ userID, userData, docID } : any) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [servicios, setServicios] = useState("");

    const handleSubmit = async () => {
        const userID = auth.currentUser?.uid;
        if (!userID) {
            console.log("No user is currently logged in.");
            return;
        }

        // Validate required fields and structure of email and phone
        if (!nombre || !correo || !telefono || !ciudad || !empresa || !servicios) {
            Alert.alert("Error", "Por favor, completa todos los campos obligatorios.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(correo)) {
            Alert.alert("Error", "Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (!phoneRegex.test(telefono)) {
            Alert.alert("Error", "Por favor, ingresa un número de teléfono de 10 dígitos.");
            return;
        }

        try {
            await addDoc(collection(db, "forms_allies"), {
                userID,
                nombre,
                correo,
                telefono,
                ciudad,
                empresa,
                servicios,
                createdAt: new Date(),
            });
            console.log("Form allies submitted successfully!");
            Alert.alert("Enviado", "Formulario enviado correctamente. Pronto daremos seguimiento a tu solicitud.");

            // Clear the fields after submitting the form
            setNombre("");
            setCorreo("");
            setTelefono("");
            setCiudad("");
            setEmpresa("");
            setServicios("");
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View>
                    <Text className="text-2xl font-bold text-[#333333] pb-0.5">Únete a nosotros</Text>
                    <Text className="text-sm text-[#666666] pb-0.5">Donaciones y Servicios. ¿Estás interesado?</Text>
                    <Text className="text-sm text-[#999999]">
                        Esta es la modalidad con la que tu empresa se registra para formar parte de los 
                        aliados del Banco de Alimentos. Aportando donativos o servicios.
                    </Text>

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Nombre <Text className="text-red-500">*</Text></Text>
                    <TextInput
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Escribe tu nombre"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                    />

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Correo Electrónico Personal<Text className="text-red-500"> *</Text></Text>
                    <TextInput
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder="ejemplo@gmail.com"
                        keyboardType="email-address"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                    />

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Teléfono Personal<Text className="text-red-500"> *</Text></Text>
                    <TextInput
                        value={telefono}
                        onChangeText={setTelefono}
                        placeholder="Número de teléfono"
                        keyboardType="phone-pad"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                    />

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Ciudad <Text className="text-red-500">*</Text></Text>
                    <TextInput
                        value={ciudad}
                        onChangeText={setCiudad}
                        placeholder="Ciudad"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                    />

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Nombre de Empresa u Organización <Text className="text-red-500">*</Text></Text>
                    <TextInput
                        value={empresa}
                        onChangeText={setEmpresa}
                        placeholder="Empresa u Organización"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                    />

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Servicios o fondos <Text className="text-red-500">*</Text></Text>
                    <TextInput
                        value={servicios}
                        onChangeText={setServicios}
                        placeholder="Menciona lo que tu empresa u organización podría aportar al Banco de Alimentos"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                        multiline
                    />

                    <View className="flex items-center justify-center mt-8">
                        <Pressable className="py-3 w-60 flex items-center justify-center rounded-full bg-[#00A435] active:bg-[#00a434b0]" onPress={handleSubmit}>
                            <Text className="text-white text-center text-base font-semibold">Enviar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
