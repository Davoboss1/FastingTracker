import { Button } from "@react-navigation/elements";
import { FlatList, Platform, StyleSheet, TextInput, ToastAndroid, View } from "react-native";
import TimeIcon from "@/icons/time.svg"
import { COLORS } from "@/style";
import TopButton from "@/components/top_buttons";
import FastingCard from "@/components/fasting_card";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fasting_plan, RootStackParamList } from "@/types";
import { emptyPlan, fastingPlansOptions } from "@/constansts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addFastingPlansToStorage, getFastingPlansFromStorage, getFontFamily, getPeriodProgress } from "@/helpers";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@/components/Text";
import EmptyView from "@/components/EmptyView";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomePage = () => {

    const insets = useSafeAreaInsets();

    const navigation = useNavigation<NavigationProp>();

    const [FastingPlans, setFastingPlans] = useState<fasting_plan[]>([]);
    const [showEditFastingPlan, setShowEditFastingPlan] = useState(false);

    const [currentFastingPlan, setCurrentFastingPlan] = useState<fasting_plan>(emptyPlan);

    useEffect(() => {
        (async function () {
            try {
                const plans = await getFastingPlansFromStorage();
                setFastingPlans(plans || []);
            } catch (e) {
                // error reading value
            }
        })();

    }, [])


    const addFastingPlans = async () => {
        try {
            if (currentFastingPlan) {
                if (!currentFastingPlan.eatingHours || !currentFastingPlan.eatingHours || !currentFastingPlan.description) {
                    ToastAndroid.show("Please ensure you fill in the fasting hours, eating hours and description.", ToastAndroid.LONG);
                    return;
                }
                const plans = await addFastingPlansToStorage(currentFastingPlan);
                setFastingPlans(plans);

                ToastAndroid.show("Fasting Plan Added Successfully", ToastAndroid.LONG);
                setCurrentFastingPlan(emptyPlan);
                setShowEditFastingPlan(false);
            }
        } catch {
        }
    }

    const onChangeTextForDescription = (text: string) => {
        if (currentFastingPlan)
            setCurrentFastingPlan({ ...currentFastingPlan, description: text });
    }

    const editFastingPlanView = (<View>
        <View style={{
            flexDirection: "row", justifyContent: "space-around"
        }}>
            <View style={{ width: "45%" }}>
                <AppText fontWeight="bold">
                    Fasting Hours:
                </AppText>

                <View style={style.hourTextInputContainer}>
                    <TextInput style={{
                        fontFamily: getFontFamily()
                    }} placeholder="Fasting Hours" placeholderTextColor={"grey"} value={(currentFastingPlan?.fastingHours || "").toString()} onChangeText={(text) => {
                        setCurrentFastingPlan({ ...currentFastingPlan, fastingHours: parseInt(text) })
                    }} keyboardType="number-pad" />
                    <TimeIcon width={20} height={20} fill={"#0097A7"} />
                </View>


            </View>
            <View style={{ width: "45%" }}>
                <AppText fontWeight="bold">
                    Eating Hours:
                </AppText>

                <View style={style.hourTextInputContainer}>
                    <TextInput style={{
                        fontFamily: getFontFamily()
                    }} placeholder="Eating Hours" placeholderTextColor={"grey"} value={(currentFastingPlan?.eatingHours || "").toString()} keyboardType="number-pad" onChangeText={(text) => {
                        setCurrentFastingPlan({ ...currentFastingPlan, eatingHours: parseInt(text) })
                    }} />
                    <TimeIcon width={20} height={20} fill={"#0097A7"} />
                </View>


            </View>

        </View>
        <View style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 15,
            marginTop: 10
        }}>
            <TextInput placeholder="Enter Fasting Description" placeholderTextColor={"grey"}
                style={{ width: "70%", borderBottomWidth: 2, borderBottomColor: "#26C6DA", fontFamily: getFontFamily() }}
                onChangeText={onChangeTextForDescription} value={currentFastingPlan.description} />

            {/* @ts-ignore */}
            <Button color="white" style={{
                backgroundColor: "#00ACC1",
            }} onPressOut={addFastingPlans}>
                <AppText>
                    Create
                </AppText>
            </Button>
        </View>
    </View>);


    return (<View
        style={[style.mainView, {
            marginTop: insets.top,
        }]}
    >
        <FlatList
            ListHeaderComponent={<>
                <AppText fontWeight="bold" style={style.helloText}>Hello there </AppText>
                <AppText style={{
                    color: "#607D8B",
                    marginLeft: 5
                }}>
                    Create a Plan:

                </AppText>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20, marginTop: 10 }}>
                    {fastingPlansOptions.map((options) => <TopButton key={`${options.fastingHours}:${options.eatingHours}`} text={`${options.fastingHours}:${options.eatingHours}`} onPress={() => {
                        setCurrentFastingPlan({ ...currentFastingPlan, eatingHours: options.eatingHours, fastingHours: options.fastingHours });
                        setShowEditFastingPlan(true);
                    }} />)}
                    <TopButton text="Custom" onPress={() => {
                        setCurrentFastingPlan(emptyPlan)
                        setShowEditFastingPlan(true);
                    }} />

                </View>

                {showEditFastingPlan && editFastingPlanView}

                <View style={style.horizontalContainerView}>
                    <AppText fontWeight="bold" style={style.titleText}>Past 5 Fastings</AppText>
                    {/* @ts-ignore */}
                    <Button color="#006064" style={{
                        backgroundColor: "#B2EBF2"
                    }} onPressOut={() => {
                        navigation.navigate("Fastings");
                    }}>
                        <AppText fontWeight="semibold">
                            Show More
                        </AppText>
                    </Button>
                </View>
            </>}

            ListEmptyComponent={<EmptyView message={"You don't have any fasting plan added yet, click the buttons above to create a new fasting plan."} />}

            contentContainerStyle={style.listContainerStyle}
            data={FastingPlans.slice(0, 5)} renderItem={({ item }) => (
                <FastingCard
                    description={item.description || ""}
                    datetime={item.datetime || ""}
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

    },
    horizontalContainerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 5
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
        paddingTop: 70,
        paddingBottom: 20
    },
    helloText: {
        fontSize: 20,
        color: "#37474F",
        marginBottom: 10,
        marginLeft: 5
    },
    hourTextInputContainer: {
        borderWidth: 0.5,
        width: "100%",
        borderRadius: 5,
        borderColor: "#26C6DA",
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 10,
        justifyContent: "space-between"
    }
});

export default HomePage;