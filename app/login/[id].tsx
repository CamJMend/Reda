import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { auth, db } from "../../components/initApp";
import { admins } from "./admins";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Login() {
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
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
                if (admins.emails.includes(email)) {
                    router.push('/admin/adminMainScreen')
                } else {
                    router.push('/main/mainScreen')
                }
            } else if (id == "2") {
                // Check if the password and the repeated password are the same
                if (password == passwordRepeated) {
                    const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
                    Toast.show({
                        type: 'success',
                        text1: 'User Created',
                        text2: "Setting the data...",
                        visibilityTime: 3000,
                        autoHide: true
                    })
                    try {
                        var userCollection = collection(db, "users");
                        await addDoc(userCollection, {
                            userID: user.uid,
                            email: email,
                            name: name,
                            birthday: birthday
                        });
                        router.push('/main/mainScreen')
                    } catch (error : any) {
                        console.error("Error adding user data: ", error);
                    }
                    console.log('User created successfully!');
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

    return (
        <>
            <View className="grow grid-cols-3">
                {/* Blank top space */}
                <View className="mb-10"/>

                {/* Header */}
                <View className="w-full flex flex-col">
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
                    <Image
                        source={require("../../assets/background_login_strokes.png")}
                        className="w-full h-24 mt-6"
                    />
                </View>

                {/* Main Content Scroll */}
                <KeyboardAvoidingView behavior="padding" className="grow h-1">
                    <ScrollView className="grow my-7">
                        {/* Main Container */}
                        <View className="px-5">
                            {/* Title and Subtitle */}
                            <View className="">
                                <Text className="font-bold text-2xl">
                                    {id == "1" ? "Iniciar Sesión" : "Crea una cuenta"}
                                </Text>
                                <Text className="mt-3">
                                    {id == "1" ? "Bienvenido/a de nuevo a Reda" : "Bienvenido/a a Reda"}
                                </Text>
                            </View>

                            {/* Name Form */}
                            {id == "2" && 
                                <View className="mt-8">
                                    <Text className="font-bold">Nombre</Text>
                                    <TextInput
                                        className='h-14 border-[#ddd] border p-2 rounded'
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Tu nombre"
                                    />
                                </View>
                            }

                            {/* Birthday Form */}
                            {id == "2" && 
                                <View className="mt-5">
                                    <Text className="font-bold">Fecha de Nacimiento</Text>
                                    <TextInput
                                        className='h-14 border-[#ddd] border p-2 rounded'
                                        value={birthday}
                                        onChangeText={setBirthday}
                                        placeholder="dd/mm/aaaa"
                                    />
                                </View>
                            }

                            {/* Email Form */}
                            <View className={id == "1" ? "mt-10" : "mt-5"}>
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
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Continue and Switch */}
                <View className="w-full pb-10 items-center">
                    {/* Log In Button */}
                    <Pressable
                        className="py-3 w-60 flex items-center justify-center rounded-full bg-[#00A435] active:bg-[#00a434b0]"
                        onPress={handleLogIn}
                    >
                        <Text className="text-white font-bold text-base pb-1">
                            {id == "1" ? "Continuar" : "Registrarse"}
                        </Text>
                    </Pressable>

                    {/* Sign Up Link */}
                    <Link asChild href={id == "1" ? "/login/2" : "/login/1"} className="mt-5">
                        <Pressable>
                            <Text className="text-[#00A435] active:text-black underline">
                                {id == "1" ? "Crear una cuenta" : "Ya tengo una cuenta"}
                            </Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
            <Toast/>
        </>
    )
}