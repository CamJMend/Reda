import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";

export default function AdminAllies() {
    return (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text className="text-2xl font-bold text-[#333333] pb-0.5">Únete a nosotros</Text>
                    <Text className="text-sm text-[#666666] pb-0.5">Donaciones y Servicios. ¿Estás interesado?</Text>
                    <Text className="text-sm text-[#999999]">
                        Esta es la modalidad con la que tu empresa se registra para formar parte de los 
                        aliados del Banco de Alimentos. Aportando donativos o servicios.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
