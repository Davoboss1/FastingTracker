export type fasting_plan = {
    id?: number,
    fastingHours: number | string;
    eatingHours: number | string;
    description?: string;
    datetime?: string;
    fastingStartTime: number;
};

export type RootStackParamList = {
    Home: undefined;
    Timer: {
        id: number | undefined
    };
    Fastings: undefined;
};