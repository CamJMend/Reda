import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import Toast from 'react-native-toast-message';
import { auth, db } from "../../components/initApp";
import { admins } from "./admins";
import { EyeIcon } from "../../components/svgExports";

export default function Login() {
    const [name, setName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeated, setPasswordRepeated] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const { id } = useLocalSearchParams()
    const [requirementsMet, setRequirementsMet] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        checkPasswordRequirements(text);
    };

    const checkPasswordRequirements = (password: any) => {
        const requirements = {
            length: password.length >= 8 && password.length <= 20,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        setRequirementsMet(requirements);

        const score = Object.values(requirements).filter(Boolean).length;
        setPasswordStrength(score);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-300";
        if (passwordStrength > 0 && passwordStrength < 2) return "bg-red-500";
        if (passwordStrength > 2 && passwordStrength < 5) return "bg-yellow-500";
        return "bg-green-500";
    };
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

    const canCreateAccount = passwordStrength === 5;

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
                <KeyboardAvoidingView behavior="padding" className="flex-1">
                    <ScrollView className="grow my-7" showsVerticalScrollIndicator={false}>
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
                            <View className={id == "1" ? "mt-8" : "mt-5"}>
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
                                        onChangeText={handlePasswordChange}
                                        placeholder="••••••••"
                                        secureTextEntry={!showPassword}
                                    />
                                    <Pressable onPress={handleShowPassword} className="h-full w-[15%] items-center justify-center">
                                        <EyeIcon name={showPassword ? "eye" : "eye-slash"} size={30} color="black" />
                                    </Pressable>
                                </View>

                                {/* Barra de seguridad */}
                                {id === "2" && (
                                <>
                                    {/* Password Strength Bar */}
                                    <View className={`h-2 mt-2 ${getPasswordStrengthColor()}`} />

                                    {/* Password Requirements */}
                                    <View className="mt-3">
                                        <Text className={`text-sm ${requirementsMet.length ? 'text-green-600' : 'text-red-600'}`}>
                                            {requirementsMet.length ? "✔ " : "✘ "} Entre 8 y 20 caracteres
                                        </Text>
                                        <Text className={`text-sm ${requirementsMet.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                                            {requirementsMet.uppercase ? "✔ " : "✘ "} Al menos una letra mayúscula
                                        </Text>
                                        <Text className={`text-sm ${requirementsMet.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                                            {requirementsMet.lowercase ? "✔ " : "✘ "} Al menos una letra minúscula
                                        </Text>
                                        <Text className={`text-sm ${requirementsMet.number ? 'text-green-600' : 'text-red-600'}`}>
                                            {requirementsMet.number ? "✔ " : "✘ "} Al menos un número
                                        </Text>
                                        <Text className={`text-sm ${requirementsMet.specialChar ? 'text-green-600' : 'text-red-600'}`}>
                                            {requirementsMet.specialChar ? "✔ " : "✘ "} Al menos un carácter especial
                                        </Text>
                                    </View>
                                </>
                            )}

                            </View>

                            {/* Confirmar Contraseña Form */}
                            {id == "1" ? 
                                <View className="items-center mt-7">
                                    <Text className="underline">¿Olvidaste tu contraseña?</Text>
                                </View>
                            :
                                <View className="mt-5">
                                    <Text className="font-bold">Confirmar Contraseña</Text>
                                    <View className="flex flex-row items-center h-14 border-[#ddd] border px-2 rounded ">
                                        <TextInput
                                            className='w-full'
                                            value={passwordRepeated}
                                            onChangeText={setPasswordRepeated}
                                            placeholder="••••••••"
                                            secureTextEntry={!showPassword}
                                        />
                                    </View>
                                </View>
                            }
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                {/* Continue|Register and Switch */}
                <View className="w-full pb-10 items-center">
                    <Pressable
                        className={`py-3 w-60 flex items-center justify-center rounded-full ${
                            id == "2" && !canCreateAccount ? "bg-gray-400" : "bg-[#00A435] active:bg-[#00a434b0]"
                        }`}
                        onPress={handleLogIn}
                        disabled={id == "2" && !canCreateAccount} 
                    >
                        <Text className="text-white font-bold text-base pb-1">
                            {id == "1" ? "Continuar" : "Registrarse"}
                        </Text>
                    </Pressable>

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
