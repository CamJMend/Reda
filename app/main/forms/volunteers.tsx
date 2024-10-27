import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../components/initApp";

export default function Volunteers({ userID, userData, docID } : any) {
    const [response, setResponse] = useState("");
    
    const handleSubmit = async () => {
        const userID = auth.currentUser?.uid;
        if (!userID) {
            console.log("No user is currently logged in.");
            return;
        }

        try {
            await addDoc(collection(db, "forms_volunteers"), {
                userID,
                response,
                createdAt: new Date(),
            });
            console.log("Form Volunteers submitted successfully!");
            setResponse("");
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <View className="pt-10 px-10 items-center">
            <Text className="text-lg font-bold">Volunteers Form</Text>
            <TextInput
                value={response}
                onChangeText={setResponse}
                placeholder="Your response here"
                className="border border-gray-300 rounded p-2 mt-4 w-full"
            />
            <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={handleSubmit}>
                <Text className="text-white">Submit</Text>
            </Pressable>
        </View>
    );
}
