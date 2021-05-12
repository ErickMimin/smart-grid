import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Notifications from './components/Notifications/Notifications';
import Settings from './components/Settings/Settings';
import Charts from './components/Charts/Charts';
import Colors from './constants/Colors';
import configureStore from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as ExpoNotifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Alert, Platform } from 'react-native';

const setToken = async (token: any) =>{
  try {
      await AsyncStorage.setItem('@token', token)
    } catch(error) {
      Alert.alert("No se pudo guardar el token");
    }
}

ExpoNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if(Constants.isDevice){
    const { status: existingStatus } = await ExpoNotifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if(existingStatus !== 'granted'){
      const { status } = await ExpoNotifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if(finalStatus !== 'granted'){
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await ExpoNotifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }else{
    alert('Must use physical device for Push Notifications');
  }

  if(Platform.OS === 'android'){
    ExpoNotifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: ExpoNotifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const store = configureStore();
const Stack = createStackNavigator();

export default function App() {
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  useFonts({
    Roboto_400Regular,
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setToken(token));

    notificationListener.current = ExpoNotifications.addNotificationReceivedListener(() => {});

    responseListener.current = ExpoNotifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      ExpoNotifications.removeNotificationSubscription(notificationListener.current);
      ExpoNotifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator   
          screenOptions={{
            headerLeft: () => {return null},
            headerTitle: props => <Header {...props}/>,
            headerStyle: {
              backgroundColor: Colors.primary
            },
            headerTitleContainerStyle:{
              height: '100%'
            },
            animationEnabled: false,
            cardStyle: {
              backgroundColor: Colors.white
            }
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
            }}/>
          <Stack.Screen
            name="Home"
            component={Dashboard}/>
          <Stack.Screen
            name="Charts"
            component={Charts}/>
          <Stack.Screen
            name="Notifications"
            component={Notifications}/>
          <Stack.Screen
            name="Settings"
            component={Settings}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}