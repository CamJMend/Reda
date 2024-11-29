import { View, Text, Pressable, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView } from "react-native"
import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, updateDoc, query, where } from "firebase/firestore";
import { db } from "./initApp";
import { TrashIcon } from "./svgExports"
import Toast from "react-native-toast-message";

export default function CardForm({ setShowNewCard, setShowEditCard, form, card, reload, setReload, setShowDeleteCard } : any) {
    const [descriptionPoint, setDescriptionPoint] = useState('')
    const [number, setNumber] = useState('')
    const [url, setUrl] = useState('')
    const [isLoadingPoint, setIsLoadingPoint] = useState(false)

    const handleSubmitCard = async () => {
        setIsLoadingPoint(true)
        const newCard = {
            "description": descriptionPoint,
            "number": number,
            "url": url,
        }
        if (form == "newCard") {
            await postNewCard(newCard)
        } else {
            await updateCard(newCard)
        }
        setReload(!reload)
        setIsLoadingPoint(false)
        setShowNewCard(false)
        setShowEditCard(false)
    }

    const postNewCard = async (newCard:any) => {
        try {
            if (newCard.description == "" || newCard.number == "" || newCard.url == "") {
                throw new Error("Empty Fields")
            }
            const homeCollection = collection(db, "home");
            await addDoc(homeCollection, newCard);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Card Added Successfully',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateCard = async (newCard:any) => {
        try {
            const homeCollection = collection(db, "home");
            const q = query(homeCollection, where("description", "==", `${card.description}`))
            const snapshot = await getDocs(q)
            snapshot.forEach(async (docs) => {
                const docRef = docs.ref
                await updateDoc(docRef, newCard)
            })
            console.log("Card Updated Successfully")
        } catch (error) {
            console.log("Error Updating Card")
        }
    }

    const handleDeleteCard = async () => {
        setShowEditCard(false)
        setShowDeleteCard(true)
    }

    useEffect(()=>{
        const setCardData = () => {
            setDescriptionPoint(card.description)
            setNumber(card.number)
            setUrl(card.url)
        }

        if (form == "editCard") {
            setCardData();
        }
    },[])

    return (
        <>
        <KeyboardAvoidingView behavior="padding">
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                <Pressable className="w-[80%] p-5 border-4 rounded-3xl border-[#F19800] bg-white">
                    {isLoadingPoint ?
                        <View className="absolute w-[100%] h-[100%] m-5 flex justify-center items-center bg-white z-10">
                            <ActivityIndicator size="large" color="#1D4B40" />
                            <Text className="text-md mt-4">Cargando...</Text>
                        </View>
                    : null}
                    

                    {/* Delete Icon */}
                    {form == "editCard" ?
                        <Pressable className="absolute z-10 right-5 top-5" onPress={handleDeleteCard}>
                            <TrashIcon size={25} color="black" />
                        </Pressable>
                    : null}

                    {/* Go Back */}
                    <Pressable className="w-16"
                        onPress={()=>{
                            if (form == "newCard") {
                                setShowNewCard(false)
                            } else {
                                setShowEditCard(false)
                            }
                        }}
                    >
                        <Text className="underline text-[#CE0E2D]">Regresar</Text>
                    </Pressable>

                    {/* Title */}
                    <Text className="mt-3 text-center text-xl font-bold">{form == "newCard" ? "Nueva Tarjeta" : "Editar Tarjeta"}</Text>

                    {/* Description */}
                    <Text className="mt-3 w-9/12 text-xs">Asegurate de que todos los campos contengan información, y que cumplan con las características necesarias</Text>

                    {/* Number Input */}
                    <Text className="mt-3 text-lg font-bold">Número</Text>
                    <TextInput
                        className='mt-1 border-[#ddd] border p-2 rounded'
                        onChangeText={setNumber}
                        value={number}
                        placeholder="Cantidad de la carta"
                    />

                    {/* Description Input */}
                    <Text className="mt-3 text-lg font-bold">Etiqueta</Text>
                    <TextInput
                        className='mt-1 border-[#ddd] border p-2 rounded'
                        onChangeText={setDescriptionPoint}
                        value={descriptionPoint}
                        placeholder="Descripción de la carta"
                    />

                    {/* URL Input */}
                    <Text className="mt-3 text-lg font-bold">URL de la Imagen</Text>
                    <TextInput
                        className='mt-1 border-[#ddd] border p-2 rounded'
                        onChangeText={setUrl}
                        value={url}
                        placeholder="URL del Icono de la carta"
                    />

                    {/* Add Button */}
                    <View className="mt-5 flex items-center">
                        <Pressable className="py-3 w-5/6 bg-[#F19800] rounded-full" onPress={handleSubmitCard}>
                            <Text className="text-white text-center text-lg font-bold">{form == "newCard" ? "Agregar" : "Guardar"}</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
        <Toast/>
        </>
    )
}