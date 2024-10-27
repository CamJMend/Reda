import { View, Pressable, Image } from "react-native"

export default function MainTab({ screen, setScreen, setScreenName } : any) {
    return (
        <View className="w-full h-[12.5%] pt-2 pb-4 flex flex-row justify-around items-center static border-t-2 border-[#00000013]">
            <Pressable
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "map" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "map" ? ()=>{return} : () => {
                    setScreen("map");
                    setScreenName("Mapa");
                }}
            >
                <Image
                    source={screen == "map" ? require('../assets/locationSelected.png') : require('../assets/location.png')}
                    className={screen == "map" ? "w-[60%] h-[60%]" : "w-[50%] h-[50%]"}
                />
            </Pressable>
            <Pressable 
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "home" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "home" ? ()=>{return} : () => {
                    setScreen("home");
                    setScreenName("Inicio");
                }}
            >
                <Image
                    source={screen == "home" ? require('../assets/homeSelected.png') : require('../assets/home.png')}
                    className={screen == "home" ? "w-[60%] h-[60%]" : "w-[50%] h-[50%]"}
                />
            </Pressable>
            <Pressable 
                className={`w-20 h-20 rounded-full static justify-center items-center ${screen == "forms" ? "border-4 border-[#074F40]" : ""}`}
                onPress={screen == "forms" ? ()=>{return} : () => {
                    setScreen("forms");
                    setScreenName("Registro");
                }}
            >
                <Image
                    source={screen == "forms" ? require('../assets/aidSelected.png') : require('../assets/aid.png')}
                    className={screen == "forms" ? "w-[60%] h-[60%]" : "w-[50%] h-[50%]"}
                />
            </Pressable>
        </View>
    )
}