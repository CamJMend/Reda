import { View, Pressable, Image } from "react-native"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MainTab({ screen, setScreen, setScreenName } : any) {
    return (
        <View className="w-full pt-4 pb-4 flex flex-row justify-around items-center static border-t-2 border-[#00000013]">
            <Pressable
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "map" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "map" ? ()=>{return} : () => {
                    setScreen("map");
                    setScreenName("Mapa");
                }}
            >
                <MaterialIcons name="location-on" size={screen == "map" ? 50 : 40} color={screen == "map" ? "#074F40" : "#c6c7c5"} />
            </Pressable>
            <Pressable 
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "home" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "home" ? ()=>{return} : () => {
                    setScreen("home");
                    setScreenName("Inicio");
                }}
            >
                <FontAwesome5 name="home" size={screen == "home" ? 45 : 35} color={screen == "home" ? "#074F40" : "#c6c7c5"} />
            </Pressable>
            <Pressable 
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "forms" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "forms" ? ()=>{return} : () => {
                    setScreen("forms");
                    setScreenName("Registro");
                }}
            >
                <MaterialIcons name="handshake" size={screen == "forms" ? 50 : 40} color={screen == "forms" ? "#074F40" : "#c6c7c5"} />
            </Pressable>
        </View>
    )
}