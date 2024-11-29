import { View, Text, Pressable, TextInput, ActivityIndicator, ScrollView, KeyboardAvoidingView } from "react-native"
import { useState, useEffect } from "react"
import { TrashIcon } from "./svgExports"
import { collection, addDoc, getDocs, updateDoc, query, where } from "firebase/firestore";
import { db } from "./initApp";

export default function PointForm ({ setShowNewPoint, setShowEditPoint, setShowCenterData, form, aidCenter, reload, setReload, setShowDeleteCenter } : any) {
    const [namePoint, setNamePoint] = useState('')
    const [locationPoint, setLocationPoint] = useState('')
    const [descriptionPoint, setDescriptionPoint] = useState('')
    const [isLoadingPoint, setIsLoadingPoint] = useState(false)

    const handleSubmitPoint = async () => {
        setIsLoadingPoint(true)
        const direction = await getDirection(locationPoint)
        if (direction){
            const newPoint = {
                "coordinate": {
                    "latitude": direction.lat,
                    "longitude": direction.lon
                },
                "description": descriptionPoint,
                "direction": direction.formatted,
                "title": namePoint,
            }
            if (form == "newPoint") {
                await postNewPoint(newPoint)
            } else {
                await updatePoint(newPoint)
            }
            setReload(!reload)
        }
        setIsLoadingPoint(false)
        setShowNewPoint(false)
        setShowEditPoint(false)
        setShowCenterData(false)
    }

    const getDirection = async (direction:string) => {
        if (namePoint == "" || locationPoint == "" || descriptionPoint == "") {
            return
        }

        const newDirection = encodeURIComponent(direction)
        let reqData:any = null
        await fetch(`https://api.geoapify.com/v1/geocode/search?text=${newDirection}&format=json&apiKey=9f330e280f2b43f8ae5285c763a805d7`)
            .then(response => response.json())
            .then(result => {
                const results = result["results"]
                if (results.length == 1) {
                    reqData = results
                } else if (results.length > 1) {
                    reqData = results[0]
                }
            })
            .catch(error => console.log("Error fetching direction:", error));
        return reqData
    }

    const postNewPoint = async (point:any) => {
        try {
            const aidCentersCollection = collection(db, "aidCenters");
            await addDoc(aidCentersCollection, point);
            console.log("Point Added Successfully")
        } catch (error) {
            console.log("Error Adding New Point")
        }
    }

    const updatePoint = async (point:any) => {
        try {
            const aidCentersCollection = collection(db, "aidCenters");
            const q = query(aidCentersCollection, where("title", "==", `${aidCenter.title}`))
            const snapshot = await getDocs(q)
            snapshot.forEach(async (docs) => {
                const docRef = docs.ref
                await updateDoc(docRef, point)
            })
            console.log("Point Updated Successfully")
        } catch (error) {
            console.log("Error Updating Point")
        }
    }

    const handleDeletePoint = async () => {
        setShowEditPoint(false)
        setShowCenterData(false)
        setShowDeleteCenter(true)
    }

    useEffect(()=>{
        const setPointData = () => {
            setNamePoint(aidCenter.title)
            setLocationPoint(aidCenter.direction)
            setDescriptionPoint(aidCenter.description)
        }

        if (form == "editPoint") {
            setPointData()
        }
    },[])

    return (
        <KeyboardAvoidingView behavior="padding">
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                <Pressable className="w-[80%] p-5 border-4 rounded-3xl border-[#F19800] bg-white">
                    {isLoadingPoint ?
                        <View className="absolute w-[100%] h-[100%] m-5 flex justify-center items-center bg-white z-20">
                            <ActivityIndicator size="large" color="#1D4B40" />
                            <Text className="text-md mt-4">Cargando...</Text>
                        </View>
                    : null}
                    

                    {/* Delete Icon */}
                    {form == "editPoint" ?
                        <Pressable className="absolute z-10 right-5 top-5" onPress={handleDeletePoint}>
                            <TrashIcon size={25} color="black" />
                        </Pressable>
                    : null}

                    {/* Go Back */}
                    <Pressable className="w-16"
                        onPress={()=>{
                            if (form == "newPoint") {
                                setShowNewPoint(false)
                            } else {
                                setShowEditPoint(false)
                                setShowCenterData(true)
                            }
                        }}
                    >
                        <Text className="underline text-[#CE0E2D]">Regresar</Text>
                    </Pressable>

                    {/* Title */}
                    <Text className="mt-3 text-center text-xl font-bold">{form == "newPoint" ? "Nuevo Punto" : "Editar Punto"}</Text>

                    {/* Description */}
                    <Text className="mt-3 w-9/12 text-xs">Asegurate de que todos los campos contengan información, y que cumplan con las características necesarias</Text>

                    {/* Name Input */}
                    <Text className="mt-3 text-lg font-bold">Nombre</Text>
                    <TextInput
                        className='mt-1 border-[#ddd] border p-2 rounded'
                        onChangeText={setNamePoint}
                        value={namePoint}
                        placeholder="Nombre del punto"
                    />

                    {/* Location Input */}
                    <Text className="mt-3 text-lg font-bold">Ubicación</Text>
                    <TextInput
                        className='mt-1 border-[#ddd] border p-2 rounded'
                        onChangeText={setLocationPoint}
                        value={locationPoint}
                        placeholder="Ingresa la ubicación del punto"
                    />

                    {/* Description Input */}
                    <Text className="mt-3 text-lg font-bold">Información sobre el punto</Text>
                    <TextInput
                        className='mt-1 max-h-[80px] border-[#ddd] border p-2 rounded'
                        onChangeText={setDescriptionPoint}
                        value={descriptionPoint}
                        multiline={true}
                        placeholder="Agrega la información adicional sobre el punto de recolección"
                    />

                    {/* Add Button */}
                    <View className="mt-5 flex items-center">
                        <Pressable className="py-3 w-5/6 bg-[#F19800] rounded-full" onPress={handleSubmitPoint}>
                            <Text className="text-white text-center text-lg font-bold">{form == "newPoint" ? "Agregar" : "Guardar"}</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}