import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Dimensions, Text, Button, Alert } from 'react-native';
import Colors from '../../constants/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../../redux/api';

const setHeader = async (header: any) =>{
    try {
        await AsyncStorage.setItem('header', header)
      } catch(error) {
        Alert.alert("No se pudo guardar el header");
      }
}

/**
 * Estilos para el componente Login
 */
const width = Dimensions.get('window').width / 2;
const style = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        width: width,
        height: width,
        marginBottom: 50
    },
    tinyLogo:{
        width: width * .7,
        height: (width * .44) * .7,
    },
    input:{
        padding: 5,
        borderColor: '#101010',
        borderWidth: 1,
        borderRadius: 10,
        width: width
    }
  });

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
                const response = await apiCall(`login`, {password, token: null}, null, 'POST');
                if(response.data.accept){
                    setHeader(password);
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
            <Text>
                Introduce el código
            </Text>
            <TextInput
            placeholder='Código'
            style={style.input}
            value={password}
            textContentType={'password'}
            onChangeText={setPassword}/>
            <View style={{marginTop: 20}}>
                <Button 
                    title='Entrar' 
                    onPress={()=>goToHome()}
                    color={Colors.primary}/>
            </View>
            {/*<Image
            source={require('../assets/img/tinyLogo.png')}
            style={style.tinyLogo}/> */}
        </View>
    );
};

export default Login;