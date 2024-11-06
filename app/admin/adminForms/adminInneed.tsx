import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";

export default function AdminInNeed() {
    return (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text className="text-2xl font-bold text-[#333333] pb-0.5">REDA</Text>
                    <Text className="text-base text-[#666666] pb-0.5">¿Requieres de apoyo con alimentos?</Text>
                    <Text className="text-sm text-[#999999]">
                        Esta es la modalidad con la que te registras para que el Banco de 
                        Alimentos cuente con tus datos y ubicación y hagan lo posible por enviar ayuda.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
