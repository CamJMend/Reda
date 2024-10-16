import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import Toast from 'react-native-toast-message';
import { auth } from "../../components/initApp";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeated, setPasswordRepeated] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { id } = useLocalSearchParams()

    const handleLogIn = async () => {
        try {
            // Sign in or sign up
            if (id == "1") {
                await signInWithEmailAndPassword(auth, email, password);
                console.log('User signed in successfully!');
                router.push('/main/home')
            } else if (id == "2") {
                // Check if the password and the repeated password are the same
                if (password == passwordRepeated) {
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('User created successfully!');
                    router.push('/user/data')
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: "Las contraseñas son diferentes",
                        visibilityTime: 3000,
                        autoHide: true
                    })
                }
            }
        } catch (error : any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `${error.message}`,
                visibilityTime: 3000,
                autoHide: true
            })
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const logOut = async () => {
            console.log('User logged out successfully!');
            await signOut(auth);
            router.push('/')
        }

        if (id == "3") {
            logOut()
        }
    }, []);

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView>
                <View className="pt-12">
                    {/* Header */}
                    <View className="flex flex-row justify-between px-8">
                        {/* Title */}
                        <View>
                            <Text>By REDA</Text>
                        </View>

                        {/* Logo Image */}
                        <View className="w-16 h-10">
                            <Image
                                source={require('../../assets/bamx_logo.png')}
                                className="w-full h-full"
                            />
                        </View>
                    </View>

                    {/* Background Image */}
                    <View className="mt-6">
                        <Image
                            source={require("../../assets/background_login_strokes.png")}
                            className="w-full h-24"
                        />
                    </View>

                    <View className="px-5">
                        {/* Title and Subtitle */}
                        <View className="mt-10">
                            <Text className="font-bold text-2xl">
                                {id == "1" ? "Iniciar Sesión" : "Registro"}
                            </Text>
                            <Text className="mt-3">
                                {id == "1" ? "Bienvenido/a de nuevo a Reda" : "Bienvenido/a a Reda empieza registrandote"}
                            </Text>
                        </View>

                        {/* Email Form */}
                        <View className="mt-10">
                            <Text className="font-bold">Correo Electrónico</Text>
                            <TextInput
                                className='h-14 border-[#ddd] border p-2 rounded'
                                value={email}
                                onChangeText={setEmail}
                                placeholder="ejemplo@gmail.com"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Form */}
                        <View className="mt-5">
                            <Text className="font-bold">Contraseña</Text>
                            <View className="flex flex-row items-center h-14 border-[#ddd] border px-2 rounded ">
                                <TextInput
                                    className='w-[85%] mr-2'
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="••••••••"
                                    secureTextEntry={!showPassword}
                                />
                                <Pressable onPress={handleShowPassword} className="h-full w-[15%] items-center justify-center">
                                    <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={30} color="black" />
                                </Pressable>
                            </View>
                        </View>

                        {/* Recover Password or Repeat Password Form */}
                        {id == "1" ? 
                            <View className="items-center mt-7">
                                <Text className="underline">¿Olvidaste tu contraseña?</Text>
                            </View>
                        :
                            <View className="mt-5">
                                <Text className="font-bold">Confirmar Contraseña</Text>
                                <View className="flex flex-row items-center h-14 border-[#ddd] border px-2 rounded ">
                                    <TextInput
                                        className='w-[85%] mr-2'
                                        value={passwordRepeated}
                                        onChangeText={setPasswordRepeated}
                                        placeholder="••••••••"
                                        secureTextEntry={!showPassword}
                                    />
                                    <Pressable onPress={handleShowPassword} className="h-full w-[15%] items-center justify-center">
                                        <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={30} color="black" />
                                    </Pressable>
                                </View>
                            </View>
                        }
                        

                        {/* Continue and Switch */}
                        <View className={`items-center ${id == "1" ? "mt-20" : "mt-8"}`}>
                            {/* Log In Button */}
                            <Pressable
                                className="py-4 px-12 rounded-full bg-[#00A435] active:bg-[#00a434b0]"
                                onPress={handleLogIn}
                            >
                                <Text className="text-white font-bold">
                                    {id == "1" ? "Continuar" : "Registrarse"}
                                </Text>
                            </Pressable>

                            {/* Sign Up Link */}
                            <Link asChild href={id == "1" ? "/login/2" : "/login/1"} className="mt-12">
                                <Pressable>
                                    <Text className="text-[#00A435] active:text-black underline">
                                        {id == "1" ? "Crear una cuenta" : "Ya tengo una cuenta"}
                                    </Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Toast/>
        </KeyboardAvoidingView>
    )
}