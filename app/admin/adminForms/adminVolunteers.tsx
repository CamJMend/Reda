import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";

export default function AdminVolunteers() {
    return (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text className="text-2xl font-bold text-[#333333] pb-0.5">Sé un voluntario</Text>
                    <Text className="text-base text-[#666666] pb-0.5">Dona tu tiempo. ¿Estás interesado?</Text>
                    <Text className="text-sm text-[#999999]">
                        Esta es la modalidad con la que asistes a realizar juntos las actividades 
                        del voluntariado en las comunidades que atendemos y en nuestra bodega. 
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
