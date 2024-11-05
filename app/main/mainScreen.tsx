import { View, Pressable, Text } from "react-native";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../components/initApp";
import { router } from 'expo-router';
import { BackHandler } from "react-native";
import MainHeader from "../../components/mainHeader";
import MainTab from "../../components/mainTab";
import Home from "./home";
import Map from "./map";
import Forms from "./forms";
import Loading from "../../components/loading";
import Error404 from "../../components/error404";

export default function Main() {
    const [reload, setReload] = useState(false);
    const [screen, setScreen] = useState("home");
    const [screenName, setScreenName] = useState("Inicio");
    const [userID, setUserID] = useState("")
    const [userData, setUserData] = useState<any>({})
    const [docID, setDocID] = useState("")
    const [showLogOut, setShowLogOut] = useState(false)

    const handleLogOut = () => {
        router.navigate('/');
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

        // if (screenName == "home" || screenName == "map" || screenName == "forms" || screenName == "formAllies" || screenName == "formVolunteers" || screenName == "formInNeed") {}
        BackHandler.addEventListener('hardwareBackPress', ()=>{return true})

        if (auth.currentUser) {
            setUserID(auth.currentUser.uid);
            getUserData();
        } else {
            console.log("No user is currently logged in.");
        }
    },[userID, reload]);

    return (
        <View className="relative grow justify-between items-center grid-cols-3">
            {/* Loading Screen */}
            {userData.name ? null : <Loading />}

            {/* Logout Button */}
            {showLogOut ?
                <Pressable 
                    className="absolute top-[100px] z-10 px-7 py-3 bg-red-500 rounded items-left self-start ml-10"
                    onPress={handleLogOut}
                >
                    <Text className="text-white font-semibold">Log Out</Text>
                </Pressable>
            : null}

            {/* Header */}
            <MainHeader screenName={screenName} showLogOut={showLogOut} setShowLogOut={setShowLogOut}/>

            {/* Main Content */}
            {screen == "home" ?
                <Home userID={userID} userData={userData} docID={docID} />
            : screen == "map" ?
                <Map userID={userID} userData={userData} docID={docID} />
            : screen == "forms" ?
                <Forms userID={userID} userData={userData} docID={docID} setScreen={setScreen} setScreenName={setScreenName} />
            :
                <Error404 />
            }

            {/* Bottom Tab */}
            <MainTab screen={screen} setScreen={setScreen} setScreenName={setScreenName} />
        </View>
    )
}