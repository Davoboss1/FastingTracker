import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TimerIcon from "@/icons/timer.svg";
import Timer1Icon from "@/icons/timer1.svg";
// import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from "@expo-google-fonts/playfair-display";
import AppText from "./Text";

export default function Header(headerProps: NativeStackHeaderProps) {

    const insets = useSafeAreaInsets();

    return (
        <View style={[{
            top: insets.top,
        }, style.mainView]}>
            <Timer1Icon width={30} height={30} />
            <Timer1Icon width={30} height={30} rotation={180} />
            <AppText fontWeight="bold" style={{
                color: "black",
                fontSize: 20,
                marginLeft: "auto",
                marginRight: "auto"
            }}>Fasting Tracker</AppText>
            <TimerIcon width={30} height={30} />
            <TimerIcon width={30} height={30} rotation={180} />
        </View>
    )
}

const style = StyleSheet.create({
    mainView: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#CFD8DC",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flex: 1,
        width: "100%",
        backgroundColor: "#f2f2f2"
    }
});