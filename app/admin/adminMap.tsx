import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { collection, getDocs, deleteDoc, query, where } from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";
import AddButton from "../../components/addButton";
import PointForm from "../../components/pointForm";
import { PencilIcon } from "../../components/svgExports";
import { db } from "../../components/initApp";

export default function AdminMap({ aidCenters, reload, setReload } : any) {
    const [showCenterData, setShowCenterData] = useState(false);
    const [showNewPoint, setShowNewPoint] = useState(false);
    const [showEditPoint, setShowEditPoint] = useState(false);
    const [centerSelected, setCenterSelected] = useState(-1);
    const [showDeleteCenter, setShowDeleteCenter] = useState(false)
    const [origin, setOrigin] = useState({
        latitude: 20.6604443,
        longitude: -103.3337275
    });

    const handleSelectCenter = (index: number) => {
        setCenterSelected(index)
        setShowCenterData(true)
    }

    const handleShowNewPoint = () => {
        setShowNewPoint(true)
    }

    const handleEditPoint = () => {
        setShowCenterData(false)
        setShowEditPoint(true)
    }

    const handleDeletePoint = async () => {
        try {
            const aidCentersCollection = collection(db, "aidCenters");
            const q = query(aidCentersCollection, where("title", "==", `${aidCenters[centerSelected].title}`))
            const snapshot = await getDocs(q)
            snapshot.forEach(async (docs) => {
                const docRef = docs.ref
                await deleteDoc(docRef)
            })
            console.log("Point Deleted Successfully")
            setReload(!reload)
        } catch (error) {
            console.log("Error Deleting Point")
        }
        setShowDeleteCenter(false)
    }

    return (
        <View className="relative flex-1 w-full">
            {/* Add Button */}
            <Pressable className="absolute z-10 right-10 top-10" onPress={handleShowNewPoint}>
                <AddButton size={45} />
            </Pressable>

            {/* Point Form */}
            {showNewPoint || showEditPoint ?
                <Pressable className="absolute w-full h-full z-10 flex flex-col items-center justify-center bg-[#00000038]" onPress={()=>{setShowNewPoint(false); setShowEditPoint(false)}}>
                    <PointForm setShowNewPoint={setShowNewPoint} setShowEditPoint={setShowEditPoint} setShowCenterData={setShowCenterData} form={showNewPoint ? "newPoint" : "editPoint"} aidCenter={aidCenters[centerSelected]} reload={reload} setReload={setReload} setShowDeleteCenter={setShowDeleteCenter} />
                </Pressable>
            : null}

            {/* Center Card */}
            {showCenterData ? 
                <Pressable className="absolute w-full h-full z-10 flex flex-col items-center justify-center bg-[#00000038]" onPress={()=>setShowCenterData(false)}>
                    <Pressable className="w-[80%] p-5 border-4 rounded-3xl border-orange-300 bg-white">
                        <View className="flex-row w-full justify-between items-center">
                            <Text className="text-[#939393]">Informacion del punto</Text>
                            <Pressable onPress={handleEditPoint}>
                                <PencilIcon size={35} color="black" />
                            </Pressable>
                        </View>
                        <Text className="mt-3 text-center text-lg font-bold pt text-orange-400">{aidCenters[centerSelected].title}</Text>
                        <Text className="mt-3 text-xs text-gray-900">{aidCenters[centerSelected].direction}</Text>
                        <Text className="mt-2 text-sm font-bold">Informacion sobre el punto de apoyo:</Text>
                        <Text className="mt-2 text-sm">{aidCenters[centerSelected].description}</Text>
                    </Pressable>
                </Pressable>
            : null}

            {/* Verify Delete */}
            {showDeleteCenter ?
                <Pressable className="absolute w-full h-full z-10 flex flex-col items-center justify-center bg-[#00000038]" onPress={()=>setShowDeleteCenter(false)}>
                    <Pressable className="w-[80%] p-5 border-4 rounded-3xl border-orange-300 bg-white">
                        <Text className="mt-3 text-center text-xl font-bold">Eliminar Punto</Text>
                        <Text className="mt-3 text-xs text-center text-gray-900">Esta acción eliminará la información del punto de recolección, y no será posible recuperarla</Text>
                        <View className="mt-5 flex-row items-center justify-center">
                            {/* Undo Button */}
                            <Pressable className="px-7 py-2 rounded-full bg-[#939393]" onPress={()=>{setShowDeleteCenter(false)}}>
                                <Text className="text-lg text-white">Cancelar</Text>
                            </Pressable>

                            {/* Delete Button */}
                            <Pressable className="ml-3 px-7 py-2 rounded-full bg-[#CE0E2D]" onPress={handleDeletePoint}>
                                <Text className="text-lg text-white">Eliminar</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            : null}

            {/* Map */}
            <MapView
                className="absolute w-full h-full z-0"
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.3,
                    longitudeDelta: 0.3
                }}
            >
                {aidCenters.map((center:any, index:any) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={center.coordinate}
                            onPress={() => {handleSelectCenter(index)}}
                        />
                    )
                })}
            </MapView>
        </View>
    )
}