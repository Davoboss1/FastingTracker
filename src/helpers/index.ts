import { fasting_plan } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const addFastingPlansToStorage: (fastingPlan: fasting_plan) => Promise<fasting_plan[]> = async (fastingPlan) => {

    const TotalFastingPlans = (await getFastingPlansFromStorage()) || [];
    console.log(TotalFastingPlans)
    //Add current date to the fasting plan
    const planToAdd = { ...fastingPlan, datetime: new Date().toDateString(), id: TotalFastingPlans.length };

    //Add it to the fasting plan list
    const plans = [planToAdd, ...TotalFastingPlans];

    // Add it to async storage
    await AsyncStorage.setItem("fasting_plan", JSON.stringify(plans));

    return plans;
}

export const getFastingPlansFromStorage: () => Promise<fasting_plan[]> = async () => {
    try {
        const value = await AsyncStorage.getItem('fasting_plan');
        if (value !== null) {
            console.log(value);
            return JSON.parse(value) || [];
        }
    } catch (e) {
        // error reading value
    }
}

export const updatePlanInStorage: (fastingPlan: fasting_plan) => void = async (plan: fasting_plan) => {
    try {

        const items: fasting_plan[] = await getFastingPlansFromStorage();

        const updatedItems = items.map(item =>
            item.id === plan.id ? { ...item, ...plan } : item
        );

        await AsyncStorage.setItem('fasting_plan', JSON.stringify(updatedItems));
        console.log(`Item with id ${plan.id} updated.`);
    } catch (error) {
        console.error('Error updating item in AsyncStorage:', error);
    }
};

export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string,
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

export const getFontFamily = (weight?: "bold" | "semibold") => {
    switch (weight) {
        case 'bold':
            return Platform.select({
                android: 'Quicksand_700Bold',
                ios: 'Quicksand-700Bold',
            });
        case 'semibold':
            return Platform.select({
                android: 'Quicksand_600SemiBold',
                ios: 'Quicksand-600SemiBoldd',
            });
        default:
            return Platform.select({
                android: 'Quicksand_400Regular',
                ios: 'Quicksand-400Regular',
            });
    }
};

export function getPeriodProgress(fastingHours: number, eatingHours: number, startDate: Date) {
    var now = new Date();
    var elapsed = (now.getTime() - startDate.getTime()) / 1000; // elapsed seconds

    var fastingSeconds = fastingHours * 3600;
    var eatingSeconds = eatingHours * 3600;
    var cycleSeconds = fastingSeconds + eatingSeconds;

    var cyclePosition = elapsed % cycleSeconds;

    var period, timeElapsedSec, timeRemainingSec, progress;
    if (cyclePosition < fastingSeconds) {
        period = 'Fasting';
        timeElapsedSec = cyclePosition;
        timeRemainingSec = fastingSeconds - timeElapsedSec;
        progress = (timeElapsedSec / fastingSeconds) * 100;
    } else {
        period = 'Eating';
        timeElapsedSec = cyclePosition - fastingSeconds;
        timeRemainingSec = eatingSeconds - timeElapsedSec;
        progress = (timeElapsedSec / eatingSeconds) * 100;
    }

    function toHMS(seconds: number) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = Math.floor(seconds % 60);
        return { hours: h, minutes: m, seconds: s };
    }

    return {
        period: period,
        progressPercent: Math.round(progress * 100) / 100,
        timeElapsed: toHMS(timeElapsedSec),
        timeRemaining: toHMS(timeRemainingSec)
    };
}