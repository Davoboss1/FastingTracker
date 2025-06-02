import { Button } from "@react-navigation/elements";
import { FlatList, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import TimeIcon from "@/icons/time.svg"
import { COLORS } from "@/style";
import TopButton from "@/components/top_buttons";
import FastingCard from "@/components/fasting_card";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fasting_plan, RootStackParamList } from "@/types";
import { emptyPlan, fastingPlansOptions } from "@/constansts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addFastingPlansToStorage, getFastingPlansFromStorage, getPeriodProgress } from "@/helpers";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@/components/Text";
import EmptyView from "@/components/EmptyView";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const FastingsPage = () => {

    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();


    const [FastingPlans, setFastingPlans] = useState<fasting_plan[]>([]);

    useEffect(() => {

        (async function () {
            try {
                const plans = await getFastingPlansFromStorage();
                setFastingPlans(plans);
            } catch (e) {
                // error reading value
            }
        })();

    }, [])

    return (<View
        style={[style.mainView, { marginTop: insets.top + 50 }]}
    >

        <FlatList ListHeaderComponent={<>

            <View style={style.horizontalContainerView}>
                <View>
                    <AppText fontWeight="bold" style={style.titleText}>Fastings</AppText>
                    <AppText style={style.resultText}>Total Results: {FastingPlans?.length || 0}</AppText>

                </View>
                {/* @ts-ignore */}
                <Button color="#006064" style={{
                    backgroundColor: "#B2EBF2"
                }} onPressOut={() => {
                    navigation.navigate("Home");
                }}>
                    <AppText fontWeight="semibold">
                        Return Home
                    </AppText>
                </Button>
            </View>
        </>}
            ListEmptyComponent={<EmptyView message={"You don't have any fasting plan added yet. Go to the homepage to create a new fasting plan."} />}
            contentContainerStyle={style.listContainerStyle} data={FastingPlans} renderItem={({ item }) => (<FastingCard
                description={item.description || ""} datetime={item.datetime || ""}
                type={item.fastingStartTime ? getPeriodProgress(parseInt(item.fastingHours.toString()), parseInt(item.eatingHours.toString()), new Date(item.fastingStartTime)).period : "None"}
                onPress={() => navigation.navigate("Timer", {
                    id: item.id
                })}
                fasting_hours={item.fastingHours}
                eating_hours={item.eatingHours}
                />)} />

    </View>);
}

const style = StyleSheet.create({
    mainView: {
        // top: 50,
        marginTop: 40
    },
    horizontalContainerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 10
    },
    titleText: {
        color: COLORS.primaryTextColor,
        fontSize: 18
    },
    resultText: {
        color: COLORS.secondaryTextColor,
        fontSize: 12,
        marginTop: 5
    },
    listContainerStyle: {
        marginHorizontal: 10,
        paddingBottom: 10,
        paddingTop: 20
    }
});

export default FastingsPage;