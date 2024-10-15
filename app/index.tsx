import { View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Welcome() {
    return (
        <>
            <View className="grow">
                {/* Section 1 */}
                <View className="h-[37%] w-full items-center pt-12">
                    {/* Title */}
                    <Text className="font-bold">By REDA</Text>

                    {/* Logo Image */}
                    <View className="w-24 h-16 mt-14">
                        <Image
                            source={require('../assets/bamx_logo.png')}
                            className="w-full h-full"
                        />
                    </View>
                </View>

                {/* Section 2 */}
                <View className="h-[25%] w-full">
                    {/* Donation Image */}
                    <Image
                        source={require('../assets/donation_welcome.png')}
                        className="w-full h-full"
                    />
                </View>

                {/* Section 3 */}
                <View className="h-[14%] w-full"></View>

                {/* Section 4 */}
                <View className="h-[24%] w-full items-center -mt-[1px]">
                    {/* Log In Button */}
                    <Link asChild href='/login/1'>
                        <Pressable className="py-4 px-12 rounded-full bg-[#00A435] active:bg-[#00a434b0]">
                            <Text className="text-white font-bold">Iniciar Sesión</Text>
                        </Pressable>
                    </Link>

                    {/* Sign Up Link */}
                    <Link asChild href='/login/2' className="mt-12">
                        <Pressable>
                            <Text className="text-[#00A435] active:text-black underline">Crear una cuenta</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        </>
    )
}