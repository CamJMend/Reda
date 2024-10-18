import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../components/initApp";

export default function Forms() {
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

    const handleGoAllies = () => {
        router.push('/main/forms/allies');
    };

    const handleGoVolunteers = () => {
        router.push('/main/forms/volunteers');
    };

    const handleGoInNeed = () => {
        router.push('/main/forms/inneed');
    };

    return (
        <View className="grow justify-center items-center">
            <ScrollView className="w-full">
                <View className="pt-10 items-center">
                    <Text className="text-lg font-bold">Select a Form</Text>
                    <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={handleGoAllies}>
                        <Text className="text-white">Aliados</Text>
                    </Pressable>
                    <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={handleGoVolunteers}>
                        <Text className="text-white">Voluntarios</Text>
                    </Pressable>
                    <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={handleGoInNeed}>
                        <Text className="text-white">InNeed</Text>
                    </Pressable>
                </View>
            </ScrollView>


            {/* Bottom Tab */}
            <View className="w-full pt-2 pb-4 flex flex-row justify-around items-center static border-t-2 border-[#00000013]">
                <Pressable className="w-20 h-20 rounded-full static justify-center items-center" onPress={handleGoMap}>
                    <Image
                        source={require('../../assets/location.png')}
                        className=" w-[50%] h-[50%]"
                    />
                </Pressable>
                <Pressable className="w-20 h-20 rounded-full static justify-center items-center" onPress={handleGoHome}>
                    <Image
                        source={require('../../assets/home.png')}
                        className=" w-[50%] h-[50%]"
                    />
                </Pressable>
                <View className="w-20 h-20 rounded-full static justify-center items-center border-4 border-[#074F40]">
                    <Image
                        source={require('../../assets/aidSelected.png')}
                        className=" w-[60%] h-[60%]"
                    />
                </View>
            </View>
        </View>
    );
}
