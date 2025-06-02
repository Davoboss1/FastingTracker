import { COLORS } from "@/style";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastingIcon from "@/icons/fasting.svg";
import ArrowRightIcon from "@/icons/arrow-right.svg";
import { generateBoxShadowStyle } from "@/helpers";
import AppText from "./Text";


export default function FastingCard({ description, datetime, type, fasting_hours, eating_hours, onPress }: {
    description: string,
    datetime: string,
    type: string,
    fasting_hours: number | string,
    eating_hours: number | string,
    onPress?: (event: GestureResponderEvent) => void
}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style.cardContainer}>

                <View style={{
                    position: "absolute",
                    top: -10,
                    left: -5,
                    zIndex: 5
                }}>
                    <View style={style.badge}>
                        <AppText style={style.badgeText}>{type}</AppText>
                    </View>
                </View>

                <View style={{
                    backgroundColor: "#B2EBF2",
                    padding: 10,
                    borderRadius: 10
                }}>
                    <FastingIcon fill={"#00BCD4"} width={40} height={40} />
                </View>

                <View style={{
                    marginLeft: 10,
                    width: "65%"
                }}>
                    <AppText fontWeight="semibold" style={{
                        color: COLORS.primaryTextColor
                    }}>
                        {description}
                    </AppText>
                    <AppText style={{
                        fontSize: 10,
                        marginTop: 5,
                        color: COLORS.primaryTextColor
                    }}>
                        {datetime}
                    </AppText>


                    <View style={{
                        marginTop: 10,
                        flexDirection: "row",
                        columnGap: 5
                    }}>
                        <View style={[style.badge, {
                            backgroundColor: "#B2EBF2"
                        }]}>
                            <AppText style={[style.badgeText, {
                                color: "#00838F"
                            }]}>Fasting Hours: {fasting_hours}</AppText>
                        </View>
                        <View style={[style.badge, {
                            backgroundColor: "#81D4FA"
                        }]}>
                            <AppText style={[style.badgeText, {
                                color: "#0277BD"
                            }]}>Eating Hours: {eating_hours}</AppText>
                        </View>
                    </View>


                </View>

                <ArrowRightIcon style={{ marginLeft: "auto" }} width={40} height={40} />
            </View>
        </TouchableOpacity >
    );
}

const style = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#f5f9fa",
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        ...generateBoxShadowStyle(-2, 4, '#80DEEA', 0.2, 3, 4, '#80DEEA')
    },
    cardInnerContainer: {
        backgroundColor: "#C5CAE9",
        padding: 10,
        borderRadius: 10
    },
    badge: {
        backgroundColor: "#26C6DA",
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginTop: "auto",
        alignSelf: "flex-start"
    },
    badgeText: {
        fontSize: 10,
        color: "#FFF",
        textAlign: "center"
    }
});