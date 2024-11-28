import { ScrollView, View, Text, Image, Pressable, Alert } from "react-native";
import { useState } from "react";
import { collection, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../../components/initApp";
import { PencilIcon } from "../../components/svgExports";
import AddButton from "../../components/addButton";
import CardForm from "../../components/cardForm";

// Home Component
export default function Home({ cardData, reload, setReload }: any) {
    const [showNewCard, setShowNewCard] = useState(false)
    const [showEditCard, setShowEditCard] = useState(false)
    const [cardSelected, setCardSelected] = useState(-1)
    const [showDeleteCard, setShowDeleteCard] = useState(false)

    const handleDeleteCard = async () => {
        try {
            const cardCollection = collection(db, "home");
            const q = query(cardCollection, where("description", "==", `${cardData[cardSelected].description}`))
            const snapshot = await getDocs(q)
            snapshot.forEach(async (docs) => {
                const docRef = docs.ref
                await deleteDoc(docRef)
            })
            console.log("Card Deleted Successfully")
            Alert.alert("Éxito", "Tarjeta eliminada correctamente");
            setReload(!reload)
        } catch (error) {
            console.log("Error Deleting Card")
            Alert.alert("Error", "La tarjeta no pudo ser eliminada");
        }
        setShowDeleteCard(false)
    }

    return (
        <View className="flex-1 w-screen">
            {/* Add Button */}
            <Pressable className="absolute z-10 right-5 bottom-5" onPress={()=>{setShowNewCard(true)}}>
                <AddButton size={60} />
            </Pressable>

            {/* Point Form */}
            {showNewCard || showEditCard ?
                <Pressable className="absolute w-full h-full z-10 flex flex-col items-center justify-center bg-[#00000038]" onPress={()=>{setShowNewCard(false); setShowEditCard(false)}}>
                    <CardForm setShowNewCard={setShowNewCard} setShowEditCard={setShowEditCard} form={showNewCard ? "newCard" : "editCard"} card={cardData[cardSelected]} reload={reload} setReload={setReload} setShowDeleteCard={setShowDeleteCard} />
                </Pressable>
            : null}

            {/* Verify Delete */}
            {showDeleteCard ?
                <Pressable className="absolute w-full h-full z-10 flex flex-col items-center justify-center bg-[#00000038]" onPress={()=>setShowDeleteCard(false)}>
                    <Pressable className="w-[80%] p-5 border-4 rounded-3xl border-orange-300 bg-white">
                        <Text className="mt-3 text-center text-xl font-bold">Eliminar Tarjeta</Text>
                        <Text className="mt-3 text-xs text-center text-gray-900">Esta acción eliminará la información de la tarjeta, y no será posible recuperarla</Text>
                        <View className="mt-5 flex-row items-center justify-center">
                            {/* Undo Button */}
                            <Pressable className="px-7 py-2 rounded-full bg-[#939393]" onPress={()=>{setShowDeleteCard(false)}}>
                                <Text className="text-lg text-white">Cancelar</Text>
                            </Pressable>

                            {/* Delete Button */}
                            <Pressable className="ml-3 px-7 py-2 rounded-full bg-[#CE0E2D]" onPress={handleDeleteCard}>
                                <Text className="text-lg text-white">Eliminar</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            : null}

            <ScrollView className="bg-white px-10">
                <View className="mb-5">
                    <Text className="my-3 text-[#333] font-bold text-2xl">Banco de Alimentos</Text>
                    <Text className="my-3 text-[#666] text-lg">By Reda</Text>
                    <Text className="mt-1 text-[#F19800] text-xs">Nuestro origen</Text>
                    <Text className="my-3 text-[#333] font-bold text-2xl">¿Quiénes somos?</Text>

                    <Text className="my-3 text-[#333] text-base">
                        Banco de Alimentos Guadalajara es una organización sin fines de lucro con la misión de generar acceso a una alimentación digna para personas en situación vulnerable en nuestra comunidad. Nuestro objetivo es contribuir a la reducción de la inseguridad alimentaria que afecta a más de un millón doscientas mil personas en el Estado de Jalisco.
                    </Text>
                </View>

                {/* Rendering the CardList */}
                <View className="mb-7">
                    {cardData.map((card:any, index:any) => (
                        <View key={index} className="mb-5 p-5 flex-row items-center border-2 rounded-3xl border-[#D21F3C]">
                            {/* Edit Icon */}
                            <Pressable className="absolute top-2 right-2 z-10" onPress={()=>{setShowEditCard(true); setCardSelected(index)}}>
                                <PencilIcon size={35} color="black" />
                            </Pressable>

                            {/* Image Container */}
                            <View className="mr-3 w-12 h-12 items-center justify-center rounded-xl bg-[#f0f0f0]">
                                <Image
                                    source={{uri: card.url}}
                                    className="w-8 h-8"
                                />
                            </View>

                            {/* Data Container */}
                            <View className="flex-1">
                                <Text className="mb-1 font-bold text-2xl">{card.number}</Text>
                                <Text className="text-[#888] text-sm">{card.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}