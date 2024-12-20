import { View, Text, TextInput, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../components/initApp";

export default function InNeed({ userID, userData, docID } : any) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async () => {
        const userID = auth.currentUser?.uid;
        if (!userID) {
            console.log("No user is currently logged in.");
            return;
        }

        // Validate required fields and structure of email and phone
        if (!nombre || !correo || !telefono || !ciudad) {
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
            await addDoc(collection(db, "forms_inneed"), {
                userID,
                nombre,
                correo,
                telefono,
                ciudad,
                mensaje,
                createdAt: new Date(),
                status: "to_do"
            });
            console.log("Form In Need submitted successfully!");
            Alert.alert("Enviado", "Formulario enviado correctamente. Pronto daremos seguimiento a tu solicitud.");

            // Clear the fields after submitting the form
            setNombre("");
            setCorreo("");
            setTelefono("");
            setCiudad("");
            setMensaje("");
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text className="text-2xl font-bold text-[#333333] pb-0.5">REDA</Text>
                    <Text className="text-base text-[#666666] pb-0.5">¿Requieres de apoyo con alimentos?</Text>
                    <Text className="text-sm text-[#999999]">
                        Esta es la modalidad con la que te registras para que el Banco de 
                        Alimentos cuente con tus datos y ubicación y hagan lo posible por enviar ayuda.
                    </Text>

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Nombre <Text className="text-red-500">*</Text></Text>
                    <TextInput
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Escribe tu nombre"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                    />

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Correo Electrónico <Text className="text-red-500">*</Text></Text>
                    <TextInput
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder="ejemplo@gmail.com"
                        keyboardType="email-address"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                    />

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Teléfono <Text className="text-red-500">*</Text></Text>
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

                    <Text className="self-start mt-4 mb-2 font-semibold text-base">Mensaje (opcional)</Text>
                    <TextInput
                        value={mensaje}
                        onChangeText={setMensaje}
                        placeholder="Información adicional"
                        className="border border-gray-300 rounded-md p-2 w-full py-3"
                        multiline
                    />

                    <View className="flex items-center justify-center mt-8 mb-5">
                        <Pressable className="py-3 w-60 flex items-center justify-center rounded-full bg-[#00A435] active:bg-[#00a434b0]" onPress={handleSubmit}>
                            <Text className="text-white text-center text-base font-semibold">Enviar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
