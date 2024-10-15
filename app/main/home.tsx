import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../components/initApp";

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
        <View className="grow justify-center items-center">
            <Text>Home</Text>
            <Text>{userData.name ? userData.name : ""}</Text>
            <Pressable className="px-6 py-3 bg-red-500 rounded-full" onPress={handleLogOut}>
                <Text className="text-white">Log Out</Text>
            </Pressable>

            <Pressable className="px-6 py-3 bg-green-500 rounded-full mt-10" onPress={handleShowData}>
                <Text className="text-white">Show Data</Text>
            </Pressable>

            <View>
                <Text></Text>
            </View>
        </View>
    )
}