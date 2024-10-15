import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../components/initApp";

export default function Map() {
    const [userID, setUserID] = useState("")
    const [userData, setUserData] = useState<any>({})
    const [docID, setDocID] = useState("")

    const handleGoHome = () => {
        router.push('/main/home')
    }

    const handleGoForms = () => {
        router.push('/main/forms')
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

    return (

        <View className="grow justify-between items-center">
            <ScrollView className="w-full">
                <View className="pt-10 items-center">
                    <Text>Map</Text>
                </View>
            </ScrollView>

            {/* Bottom Tab */}
            <View className="w-full pt-2 pb-4 flex flex-row justify-around items-center static border-t-2 border-[#00000013]">
                <View className="w-20 h-20 rounded-full static justify-center items-center border-4 border-[#074F40]">
                    <Image
                        source={require('../../assets/locationSelected.png')}
                        className=" w-[65%] h-[65%]"
                    />
                </View>
                <Pressable className="w-20 h-20 rounded-full static justify-center items-center" onPress={handleGoHome}>
                    <Image
                        source={require('../../assets/home.png')}
                        className=" w-[50%] h-[50%]"
                    />
                </Pressable>
                <Pressable className="w-20 h-20 rounded-full static justify-center items-center" onPress={handleGoForms}>
                    <Image
                        source={require('../../assets/aid.png')}
                        className=" w-[50%] h-[50%]"
                    />
                </Pressable>
            </View>
        </View>
    )
}