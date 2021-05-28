import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TextInput, Button, Alert, Platform } from 'react-native';
import { apiCall } from '../../redux/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as ExpoNotifications from 'expo-notifications';

import Colors from '../../constants/Colors';
import style from './style';

const setHeader = async (header: any) =>{
    try {
        await AsyncStorage.setItem('@header', header)
      } catch(error) {
        Alert.alert("No se pudo guardar el header");
      }
}

const getToken = async () => {
    try {
        return await AsyncStorage.getItem('@token');
    } catch(error) {
        Alert.alert("No se pudo leer el token");
    }
    return null;
}

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

/**
 * Logica para el componente Login
 */
const Login: React.FC<{navigation:any}> = ({navigation}) => {
    const [password, setPassword] = useState('');
    const notificationListener = useRef<any>(null);
    const responseListener = useRef<any>(null);

    const goToHome = () => {
        navigation.navigate('Home');
    }

    const handlerCode = async () => {
        if(password !== ''){
            try{
                const response = await apiCall(`login`, {password, token: await getToken()}, null, 'POST');
                if(response.data.accept){
                    setHeader(password);
                    setPassword('');
                    goToHome();
                }else{
                    setPassword('');
                    throw 'Codigo invalido';
                }
            }catch(error){
                Alert.alert(error);
            }
        }
        
    };

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setToken(token));
    
        notificationListener.current = ExpoNotifications.addNotificationReceivedListener(() => {});
    
        responseListener.current = ExpoNotifications.addNotificationResponseReceivedListener(() => {});
    
        return () => {
          ExpoNotifications.removeNotificationSubscription(notificationListener.current);
          ExpoNotifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    return(
        <View 
        style={style.container}>
            <Image
            source={require('../../assets/img/bigLogo.png')}
            style={style.logo}/>
            <TextInput
            placeholder='Código de acceso'
            style={style.input}
            value={password}
            textContentType={'password'}
            onChangeText={setPassword}/>
            <View style={style.button}>
                <Button 
                    title='Acceder' 
                    onPress={()=>handlerCode()}
                    color={Colors.primary}/>
            </View>
            {/*<Image
            source={require('../assets/img/tinyLogo.png')}
            style={style.tinyLogo}/>*/}
        </View>
    );
};

export default Login;