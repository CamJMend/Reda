import { AddIcon } from "./svgExports";
import { View } from "react-native";

export default function AddButton({size} : any) {
    return (
        <View className="p-[2px] rounded-full bg-[#F19800]">
            <AddIcon size={size} />
        </View>
    )
}