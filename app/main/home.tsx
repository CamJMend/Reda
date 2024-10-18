import { View, Text, Pressable, ScrollView, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../components/initApp";
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {
    const [userID, setUserID] = useState("")
    const [userData, setUserData] = useState<any>({})
    const [docID, setDocID] = useState("")

    const handleLogOut = () => {
        router.push('/login/3')
    }

    const handleShowData = () => {
        console.log(userID);
        console.log(docID);
        console.log(userData);
    }

    const handleGoMap = () => {
        router.push('/main/map')
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
            {/* Header */}
            <LinearGradient
                colors={['#074F40', 'rgba(255,255,255,1)']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                className=" lex flex-row items-center justify-around pt-10 pb-12 w-full"
            >
                <MaterialIcons name="account-circle" size={56} color="white" />
                <View className="h-14 justify-end">
                    <Text className="text-white font-bold">Inicio</Text>
                </View>
                <MaterialIcons name="notifications" size={56} color="white" />
            </LinearGradient>

            {/* Main Content */}
            <ScrollView className="w-full bg-white">
                <View className="items-center">
                    <Text>{userData.name ? userData.name : ""}</Text>
                    <Pressable className="px-6 py-3 bg-red-500 rounded-full" onPress={handleLogOut}>
                        <Text className="text-white">Log Out</Text>
                    </Pressable>

                    <Pressable className="px-6 py-3 rounded-full mt-10 bg-green-500 active:bg-[#1e9e1a49] " onPress={handleShowData}>
                        <Text className="text-white">Show </Text>
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
                <View className="w-20 h-20 rounded-full static justify-center items-center border-4 border-[#074F40]">
                    <Image
                        source={require('../../assets/homeSelected.png')}
                        className=" w-[60%] h-[60%]"
                    />
                </View>
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