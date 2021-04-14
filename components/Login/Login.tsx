import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Dimensions, Text } from 'react-native';

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
    const [code, updateCode] = useState('');

    const handlerCode = (code: any) => {
        updateCode(code);
        // Logica de comprobacion
        if(code === '123'){
            navigation.navigate('Home')
        }
    };

    return(
        <View 
        style={style.container}>
            <Image
            source={require('../assets/img/bigLogo.png')}
            style={style.logo}/>
            <Text>
                Introduce el código
            </Text>
            <TextInput
            placeholder='Código'
            style={style.input}
            value={code}
            onChangeText={handlerCode}/>
            {/*<Image
            source={require('../assets/img/tinyLogo.png')}
            style={style.tinyLogo}/> */}
        </View>
    );
};

export default Login;