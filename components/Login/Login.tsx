import React, { useState } from 'react';
import { View, Image, TextInput, Button, Alert } from 'react-native';
import { apiCall } from '../../redux/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

/**
 * Logica para el componente Login
 */
const Login: React.FC<{navigation:any}> = ({navigation}) => {
    const [password, setPassword] = useState('');

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