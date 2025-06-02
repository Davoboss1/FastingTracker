import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/screens/home';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from './src/components/header';
import TimerPage from '@/screens/timer';
import { RootStackParamList } from '@/types';
import FastingsPage from '@/screens/fastings';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          statusBarStyle: "dark",
          header: Header
        }}>
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='Timer' component={TimerPage} />
          <Stack.Screen name='Fastings' component={FastingsPage} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}