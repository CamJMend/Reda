import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, TextInput, Dimensions } from "react-native";
import { router } from "expo-router";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../components/initApp";
import { useState, useEffect } from "react";

const { height } = Dimensions.get('window');

export default function Data() {
    const [userID, setUserID] = useState("")
    const [email, setEmail] = useState<any>("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleSetData = async () => {
        try {
            var userCollection = collection(db, "users");
            await addDoc(userCollection, {
                userID: userID,
                email: email,
                name: name,
                lastName: lastName
            });
            router.push('/main/home')
        } catch (error : any) {
            console.error("Error adding user data: ", error);
        }

        console.log('User Data Added')
    }

    useEffect(() => {
        if (auth.currentUser) {
            setUserID(auth.currentUser.uid);
            setEmail(auth.currentUser.email);
        } else {
            console.log("No user is currently logged in.");
        }
    },[])

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView>
                <View className="justify-center items-center" style={{ minHeight: height }}>
                    {/* Title */}
                    <Text className="text-2xl font-bold">Datos Personales</Text>

                    {/* Form */}
                    <View className="px-5 mt-5 w-full">
                        {/* Input Name */}
                        <TextInput
                            className="h-14 border-[#ddd] border p-2 rounded"
                            placeholder="Nombre"
                            onChangeText={setName}
                            value={name}
                        />

                        {/* Input Last Name */}
                        <TextInput
                            className="h-14 border-[#ddd] border p-2 rounded mt-4"
                            placeholder="Apellido"
                            onChangeText={setLastName}
                            value={lastName}
                        />

                        {/* Continue Button */}
                        <View className="items-center mt-8">
                            <Pressable
                            className="py-4 px-12 rounded-full bg-[#00A435] active:bg-[#00a434b0]"
                            onPress={handleSetData}
                            >
                                <Text className="text-white">Continuar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}