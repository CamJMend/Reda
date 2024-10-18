import { View, Text, TextInput, Pressable, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { collection, addDoc, query, where, getDocs  } from "firebase/firestore";
import { auth, db } from "../../../components/initApp";

export default function Allies() {
    const [response, setResponse] = useState("");
    const [userID, setUserID] = useState("")
    const [userData, setUserData] = useState<any>({})
    const [docID, setDocID] = useState("")

    const handleGoHome = () => {
        router.push('/main/home')
    }

    const handleGoMap = () => {
        router.push('/main/map')
    }

    useEffect(() => {
        const getUserData = async () => {
            const users = collection(db, "users");
            const q = query(users, where("userID", "==", userID));
            const snapshot = await getDocs(q);
            snapshot.forEach((doc) => {
                setUserData(doc.data());
                setDocID(doc.id);
            });
        }

        if (auth.currentUser) {
            setUserID(auth.currentUser.uid);
            getUserData();
        } else {
            console.log("No user is currently logged in.");
        }
    },[userID])
    
    const handleSubmit = async () => {
        const userID = auth.currentUser?.uid;
        if (!userID) {
            console.log("No user is currently logged in.");
            return;
        }

        try {
            await addDoc(collection(db, "forms_allies"), {
                userID,
                response,
                createdAt: new Date(),
            });
            console.log("Form Allies submitted successfully!");
            setResponse("");
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <View className="grow justify-center items-center">
            <ScrollView className="w-full">
                <Text className="text-lg font-bold">Allies Form</Text>
                <TextInput
                    value={response}
                    onChangeText={setResponse}
                    placeholder="Your response here"
                    className="border border-gray-300 rounded p-2 mt-4 w-full"
                />
                <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={handleSubmit}>
                    <Text className="text-white">Submit</Text>
                </Pressable>
            </ScrollView>

            {/* Bottom Tab */}
            <View className="w-full pt-2 pb-4 flex flex-row justify-around items-center static border-t-2 border-[#00000013]">
                <Pressable className="w-20 h-20 rounded-full static justify-center items-center" onPress={handleGoMap}>
                    <Image
                        source={require('../../../assets/location.png')}
                        className=" w-[50%] h-[50%]"
                    />
                </Pressable>
                <Pressable className="w-20 h-20 rounded-full static justify-center items-center" onPress={handleGoHome}>
                    <Image
                        source={require('../../../assets/home.png')}
                        className=" w-[50%] h-[50%]"
                    />
                </Pressable>
                <View className="w-20 h-20 rounded-full static justify-center items-center border-4 border-[#074F40]">
                    <Image
                        source={require('../../../assets/aidSelected.png')}
                        className=" w-[60%] h-[60%]"
                    />
                </View>
            </View>
        </View>
    );
}
