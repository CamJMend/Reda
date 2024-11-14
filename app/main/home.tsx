import { ScrollView, View, Text, Image } from "react-native";

// Card Component
const Card = ({ url, number, description } : any) => {
    return (
        <View className="mb-5 p-5 flex-row items-center border-2 rounded-3xl border-[#D21F3C]">
            <View className="mr-3 w-12 h-12 items-center justify-center rounded-xl bg-[#f0f0f0]">
                <Image
                    source={{uri: url}}
                    className="w-8 h-8"
                />
            </View>
            <View className="flex-1">
                <Text className="mb-1 font-bold text-2xl">{number}</Text>
                <Text className="text-[#888] text-sm">{description}</Text>
            </View>
        </View>
    );
};

// Home Component
export default function Home({ cardData }: any) {
    return (
        <View className="flex-1">
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
                    {cardData.map((item:any, index:any) => (
                        <Card key={index} {...item} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}