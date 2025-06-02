import { COLORS } from "@/style";
import { Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import PlanIcon from "@/icons/plan.svg";
import AppText from "./Text";

export default function TopButton({ text , onPress } : { text: string, onPress: () => void}) {


    return (<TouchableOpacity style={{
        width: "30%"
    }} onPress={onPress}>
        <View style={{
            backgroundColor: "#00838F",
            flexDirection: "row",
            paddingVertical: 15,
            width: "100%",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center"
        }}>

            <PlanIcon fill={"#E8EAF6"} width={20} height={20} />
            <AppText style={{
                color: "#E0F7FA",
                marginLeft: 10
            }}>
                {text}
            </AppText>
        </View>
    </TouchableOpacity>)
}

