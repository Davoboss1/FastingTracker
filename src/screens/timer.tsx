import CustomButton from "@/components/CustomButton";
import CircularProgress from "@/components/CircularProgress";
import { emptyPlan } from "@/constansts";
import { getPeriodProgress, updatePlanInStorage } from "@/helpers";
import { fasting_plan, RootStackParamList } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import Time1Icon from "@/icons/time1.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@/components/Text";
import ArrowRightIcon from "@/icons/arrow-right.svg";


type Props = NativeStackScreenProps<RootStackParamList, 'Timer'>;

export default function TimerPage({ route, navigation }: Props) {

    const { id } = route.params;

    const insets = useSafeAreaInsets();


    const [CurrentFastingPlan, setCurrentFastingPlan] = useState<fasting_plan>(emptyPlan);

    const [fastingPeriodProgress, setFastingPeriodProgress] = useState<{
        period: string;
        progressPercent: number;
        timeElapsed: {
            hours: number;
            minutes: number;
            seconds: number;
        };
        timeRemaining: {
            hours: number;
            minutes: number;
            seconds: number;
        };
    }>();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (CurrentFastingPlan.fastingStartTime) {

            const interval = setInterval(() => {
                let periodProgress = getPeriodProgress(parseInt(CurrentFastingPlan.fastingHours.toString()), parseInt(CurrentFastingPlan.eatingHours.toString()), new Date(CurrentFastingPlan.fastingStartTime));
                setFastingPeriodProgress(periodProgress);
                setProgress(periodProgress.progressPercent / 100 > 1 ? 1 : periodProgress.progressPercent / 100);
            }, 1000);

            return () => {
                clearInterval(interval)
            }
        }
    }, [CurrentFastingPlan.fastingStartTime])



    const startFastingProgress = () => {

        const fastingStartTime = new Date().getTime();
        const updatedFastingPlan = { ...CurrentFastingPlan, fastingStartTime: fastingStartTime };
        setCurrentFastingPlan(updatedFastingPlan);
        updatePlanInStorage(updatedFastingPlan);

        setProgress(0);
    };

    useEffect(() => {
        if (id != undefined) {

            const getItemById = async () => {
                try {
                    const stored = await AsyncStorage.getItem('fasting_plan');
                    if (stored) {
                        const items: fasting_plan[] = JSON.parse(stored);
                        const foundItem = items.find(obj => obj.id === id);
                        if (foundItem) {
                            setCurrentFastingPlan(foundItem);
                        } else {
                            console.log(`Item with id ${id} not found.`);
                        }
                    }
                } catch (error) {
                    console.error('Error reading items from AsyncStorage:', error);
                }
            };
            getItemById();

        }
    }, [id]);

    return (
        <View style={[styles.container, {
            marginTop: insets.top + 60
        }]}>
            
            <View style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-start",
                marginTop: 10
            }}>

                <View style={{ width: "80%" }}>
                    <AppText style={styles.textHeader}>
                        Fasting Plan:
                    </AppText>

                    <AppText style={styles.textDisplay}>
                        {CurrentFastingPlan.description}
                    </AppText>
                </View>

                <View style={styles.badge}>
                    <AppText style={styles.badgeText}>{fastingPeriodProgress?.period || "None"}</AppText>
                </View>

            </View>

            <View style={{
                backgroundColor: "#00ACC1",
                borderRadius: 5,
                borderTopStartRadius: 15,
                borderBottomRightRadius: 15,
                padding: 10,
                marginTop: "5%"
            }}>
                <View style={{
                    flexDirection: "row"
                }}>
                    <Time1Icon width={50} height={50} />
                    <View>

                        <AppText style={styles.cardTextHeader}>
                            Eating Hours:
                        </AppText>

                        <AppText style={styles.cardTextDisplay}>
                            {CurrentFastingPlan.eatingHours}
                        </AppText>
                    </View>

                    <View style={{
                        marginLeft: 10,
                    }}>
                        <AppText style={styles.cardTextHeader}>
                            Fasting Hours:
                        </AppText>

                        <AppText style={styles.cardTextDisplay}>
                            {CurrentFastingPlan.fastingHours}
                        </AppText>
                    </View>

                </View>


                <AppText style={{
                    color: "#E0F7FA",
                    borderTopWidth: 1,
                    borderTopColor: "#00BCD4",
                    paddingTop: 10

                }}>
                    Fasting Start Time:
                </AppText>

                <AppText style={{
                    color: "#E0F7FA"
                }}>
                    {CurrentFastingPlan.fastingStartTime ? new Date(CurrentFastingPlan.fastingStartTime).toString() : "Fasting Not Started Yet"}
                </AppText>
            </View>


            <View style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "15%"
            }}>
                <CircularProgress size={200} strokeWidth={15} progress={progress} />
                <AppText style={styles.label}>
                    <AppText>
                        {fastingPeriodProgress?.progressPercent || "0"}%
                    </AppText>
                    {'\n'}
                    {CurrentFastingPlan.fastingStartTime ? <AppText style={{
                        fontSize: 12,
                    }}>{(fastingPeriodProgress?.timeElapsed.hours || '0') + "h " +
                        (fastingPeriodProgress?.timeElapsed.minutes || '0') + "m " +
                        (fastingPeriodProgress?.timeElapsed.seconds || '0') + "s"}</AppText> : <></>}
                </AppText>
            </View>

            <View style={{
                marginTop: "10%",
                marginBottom: "5%"
            }}>
                {CurrentFastingPlan.fastingStartTime ?
                    <AppText fontWeight="semibold" style={{ textAlign: "center" }}>
                        Time Remaining: {(fastingPeriodProgress?.timeRemaining.hours || '0') + "h " +
                            (fastingPeriodProgress?.timeRemaining.minutes || '0') + "m " +
                            (fastingPeriodProgress?.timeRemaining.seconds || '0') + "s"}
                    </AppText>
                    :

                    <CustomButton title="Start Fasting" onPress={() => {
                        startFastingProgress();
                    }} />}

                    {fastingPeriodProgress?.period == "Eating" &&
                    <AppText fontWeight="semibold" style={{ textAlign: "center" }}>
                        Well done! Your fast is complete. 🎉
                    </AppText>}
            </View>
            <CustomButton title="Return Home" onPress={() => {
                navigation.navigate("Home");
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 15
    },
    label: {
        position: 'absolute',
        width: 160,
        height: 160,
        textAlign: "center",
        textAlignVertical: "center",
        color: "white",
        borderRadius: 150,
        flexDirection: "column",
        fontSize: 24,
        backgroundColor: "#00838F"
    },
    textHeader: {
        color: "#546E7A",
        fontSize: 14,
        marginBottom: 5
    },
    textDisplay: {
        color: "#37474F",
        fontSize: 15,
        marginBottom: 10
    },
    cardTextHeader: {
        color: "#B2EBF2",
        fontSize: 14,
        marginBottom: 5
    },
    cardTextDisplay: {
        color: "#E0F7FA",
        fontSize: 15,
        marginBottom: 10
    },
    badge: {
        backgroundColor: "#B2EBF2",
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginLeft: "auto",
        alignSelf: "flex-start"
    },
    badgeText: {
        fontSize: 10,
        color: "#006064",
        textAlign: "center"
    }
});
