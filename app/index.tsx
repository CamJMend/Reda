import { View, Text, Image, Pressable } from "react-native";
import { useEffect } from "react";
import { Link } from "expo-router";
import { auth } from "../components/initApp";
import { signOut } from "@firebase/auth";

export default function Welcome() {

    useEffect(() => {
        const logOut = async () => {
            await signOut(auth);
            console.log('User logged out successfully!');
        }

        if (auth.currentUser) {
            logOut();
        }
    }, [])

    return (
        <View className="grow grid-cols-3">
            {/* Section 1 */}
            <View className="w-full items-center pt-12">
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
            <View className="grow w-full flex justify-center">
                {/* Image Container */}
                <View className="h-60 w-full">
                    {/* Donation Image */}
                    <Image
                        source={require('../assets/donation_welcome.png')}
                        className="w-full h-full"
                    />
                </View>
            </View>

            {/* Section 3 */}
            <View className="w-full pb-10 items-center">
                {/* Log In Button */}
                <Link asChild href='/login/1'>
                    <Pressable className="py-3 w-60 flex items-center justify-center rounded-full bg-[#00A435] active:bg-[#00a434b0]">
                        <Text className="text-white font-bold text-base pb-1">Iniciar Sesión</Text>
                    </Pressable>
                </Link>

                {/* Sign Up Link */}
                <Link asChild href='/login/2' className="mt-5">
                    <Pressable>
                        <Text className="text-[#00A435] active:text-black underline">Crear una cuenta</Text>
                    </Pressable>
                </Link>
            </View>
        </View>
    )
}