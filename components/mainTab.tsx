import { View, Pressable } from "react-native"
import { LocationIcon, HomeIcon, AidIcon } from "./svgExports";

export default function MainTab({ screen, setScreen, setScreenName } : any) {
    return (
        <View className="w-full py-4 flex flex-row justify-around items-center border-t-2 border-[#00000013]">
            <Pressable
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "map" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "map" ? ()=>{return} : () => {
                    setScreen("map");
                    setScreenName("Mapa");
                }}
            >
                <LocationIcon size={screen == "map" ? 50 : 40} color={screen == "map" ? "#074F40" : "#c6c7c5"} />
            </Pressable>
            <Pressable 
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "home" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "home" ? ()=>{return} : () => {
                    setScreen("home");
                    setScreenName("Inicio");
                }}
            >
                <HomeIcon size={screen == "home" ? 45 : 35} color={screen == "home" ? "#074F40" : "#c6c7c5"} />
            </Pressable>
            <Pressable 
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "forms" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "forms" ? ()=>{return} : () => {
                    setScreen("forms");
                    setScreenName("Registro");
                }}
            >
                <AidIcon size={screen == "forms" ? 50 : 40} color={screen == "forms" ? "#074F40" : "#c6c7c5"} />
            </Pressable>
        </View>
    )
}