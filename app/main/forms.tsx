import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { useState } from "react";
import Allies from "./forms/allies";
import Volunteers from "./forms/volunteers";
import InNeed from "./forms/inneed";
import Error404 from "../../components/error404";
import { HandShakeIcon, ArrowRightIcon, HandHoldingIcon, HandUpIcon } from "../../components/svgExports";

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
        <View className="flex-1 w-full px-10 bg-white">
            {/* Go Back Button */}
            <Pressable
                className="w-16 pb-6" onPress={handleGoBack}
            >
                <Text className="underline text-[#CE0E2D]">Regresar</Text>
            </Pressable>

            {/* Form Screens */}
            {formScreen == "formAllies" ?
                <Allies userID={userID} userData={userData} docID={docID} />
            : formScreen == "formVolunteers" ?
                <Volunteers userID={userID} userData={userData} docID={docID} />
            : formScreen == "formInNeed" ?
                <InNeed userID={userID} userData={userData} docID={docID} />
            : formScreen == "forms" ?
            <View className="flex-1">
                <Text className="text-2xl font-bold text-[#333333] pb-0.5">Registro</Text>
                <Text className="mt-3 mb-2 text-base text-[#666666] pb-0.5">Regístrate para:</Text>
                
                <Pressable 
                    className="mt-5 p-4 border-2 border-[#F19800] bg-transparent rounded-2xl w-full flex-row items-center justify-between"
                    onPress={() => {
                        setScreenName("Aliados");
                        setFormScreen("formAllies");
                    }}
                >
                    <View className="flex-row">
                        <HandShakeIcon size={30} color="#f6b737" />
                        <Text className="text-[#F19800] font-semibold text-lg mx-3 mr-8">Ser Aliado</Text>
                    </View>
                    <ArrowRightIcon size={30} color="#f6b737" />
                </Pressable>

                
                <Pressable 
                    className="mt-5 p-4 border-2 border-[#F19800] bg-transparent rounded-2xl w-full flex-row items-center justify-between"
                    onPress={() => {
                        setScreenName("Voluntarios");
                        setFormScreen("formVolunteers");
                    }}
                >
                    <View className="flex-row items-center">
                        <HandUpIcon size={30} color="#f6b737" />
                        <Text className="text-[#F19800] font-semibold text-lg mx-2 mr-4"> Ser Voluntario</Text>
                    </View>
                    <ArrowRightIcon size={30} color="#f6b737" />
                </Pressable>
                
                <Pressable 
                    className="mt-5 p-4 border-2 border-[#F19800] bg-transparent rounded-2xl w-full flex-row items-center justify-between"
                    onPress={() => {
                        setScreenName("Red de Ayuda");
                        setFormScreen("formInNeed");
                    }}
                >
                    <View className="flex-row items-center">
                        <HandHoldingIcon size={30} color="#f6b737" />
                        <Text className="text-[#F19800] font-semibold text-lg mx-3 mr-1">Recibir ayuda</Text>
                    </View>
                    <ArrowRightIcon size={30} color="#f6b737" />
                </Pressable>
            </View>
        
            :
                <Error404 />
            }
        </View>
    );
}
