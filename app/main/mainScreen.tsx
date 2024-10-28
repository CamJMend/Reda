import { View } from "react-native";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../components/initApp";
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

        BackHandler.addEventListener("hardwareBackPress", ()=>{return true});

        if (auth.currentUser) {
            setUserID(auth.currentUser.uid);
            getUserData();
        } else {
            console.log("No user is currently logged in.");
        }
    },[userID, reload]);

    return (
        <View className="grow justify-between items-center grid-cols-3">
            {userData.name ? null : <Loading />}
            {/* Header */}
            <MainHeader screenName={screenName}/>

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