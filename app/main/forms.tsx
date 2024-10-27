import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import Allies from "./forms/allies";
import Volunteers from "./forms/volunteers";
import InNeed from "./forms/inneed";
import Error404 from "../../components/error404";

export default function Forms({ userID, userData, docID, setScreen, setScreenName } : any) {
    const [formScreen, setFormScreen] = useState("forms");

    const handleGoBack = () => {
        if (formScreen == "forms") {
            setScreen("home");
            setScreenName("Inicio");
        } else {
            setFormScreen("forms");
            setScreenName("Registro");
        }
    }

    return (
        <ScrollView className=" relative w-full px-10 bg-white">
            {/* Go Back Button */}
            <Pressable
                className="w-16" onPress={handleGoBack}
            >
                <Text className="underline text-red-700">Regresar</Text>
            </Pressable>

            {formScreen == "formAllies" ?
                <Allies userID={userID} userData={userData} docID={docID} />
            : formScreen == "formVolunteers" ?
                <Volunteers userID={userID} userData={userData} docID={docID} />
            : formScreen == "formInNeed" ?
                <InNeed userID={userID} userData={userData} docID={docID} />
            : formScreen == "forms" ?
                <View className="pt-10 items-center">
                    <Text className="text-lg font-bold">Select a Form</Text>
                    <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={() => {
                        setScreenName("Aliados");
                        setFormScreen("formAllies");
                    }}>
                        <Text className="text-white">Aliados</Text>
                    </Pressable>
                    <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={() => {
                        setScreenName("Voluntarios");
                        setFormScreen("formVolunteers");
                    }}>
                        <Text className="text-white">Voluntarios</Text>
                    </Pressable>
                    <Pressable className="mt-4 p-4 bg-blue-500 rounded" onPress={() => {
                        setScreenName("Red de Ayuda");
                        setFormScreen("formInNeed");
                    }}>
                        <Text className="text-white">InNeed</Text>
                    </Pressable>
                </View>
            :
                <Error404 />
            }
        </ScrollView>
    );
}
