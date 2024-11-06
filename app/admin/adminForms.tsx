import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { useState } from "react";
import AdminAllies from "./adminForms/adminAllies";
import AdminVolunteers from "./adminForms/adminVolunteers";
import AdminInNeed from "./adminForms/adminInneed";
import Error404 from "../../components/error404";

export default function AdminForms({ setScreen, setScreenName } : any) {
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
                <AdminAllies />
            : formScreen == "formVolunteers" ?
                <AdminVolunteers />
            : formScreen == "formInNeed" ?
                <AdminInNeed />
            : formScreen == "forms" ?
            
            <View className="flex-1">
                <Text className="text-2xl font-bold text-[#333333] pb-0.5">Registro</Text>
                <Text className="mt-3 mb-2 text-base text-[#666666] pb-0.5">Regístrate para:</Text>
                
                <Pressable 
                    className="mt-5 p-4 border-2 border-[#F19800] bg-transparent rounded-2xl w-full flex-row items-center"
                    onPress={() => {
                        setScreenName("Aliados");
                        setFormScreen("formAllies");
                    }}
                >
                    <Image source={require('../../assets/icon-hands.png')} className="w-12 h-12" />
                    <Text className="text-[#F19800] font-semibold text-lg mx-3 mr-8">Ser Aliado</Text>
                    <Image source={require('../../assets/icon-arrow.png')} className="ml-20 w-4 h-4" />
                </Pressable>

                
                <Pressable 
                    className="mt-5 p-4 border-2 border-[#F19800] bg-transparent rounded-2xl w-full flex-row items-center"
                    onPress={() => {
                        setScreenName("Voluntarios");
                        setFormScreen("formVolunteers");
                    }}
                >
                    <Image source={require('../../assets/icon-vol.png')} className="w-12 h-12" />
                    <Text className="text-[#F19800] font-semibold text-lg mx-2 mr-4"> Ser Voluntario</Text>
                    <Image source={require('../../assets/icon-arrow.png')} className="ml-16 w-4 h-4" />
                </Pressable>
                
                <Pressable 
                    className="mt-5 p-4 border-2 border-[#F19800] bg-transparent rounded-2xl w-full flex-row items-center"
                    onPress={() => {
                        setScreenName("Red de Ayuda");
                        setFormScreen("formInNeed");
                    }}
                >
                    <Image source={require('../../assets/icon-receive.png')} className="w-12 h-12" />
                    <Text className="text-[#F19800] font-semibold text-lg mx-3 mr-1">Recibir ayuda</Text>
                    <Image source={require('../../assets/icon-arrow.png')} className="ml-20 w-4 h-4" />
                </Pressable>
            </View>
        
            :
                <Error404 />
            }
        </View>
    );
}