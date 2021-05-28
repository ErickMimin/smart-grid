import React from 'react';
import { Modal, Text, Button, View } from 'react-native';
import style from '../style';
import Colors from '../../../constants/Colors';

const ModalData: React.FC<{visible: any, data: any, onPress: any}> = ({visible, data, onPress})  => {
    const { aparentPower, 
        activePower,
        frequency,
        quadrant,
        powerFactor,
        production,
        voltage,
        current} = data;
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}>
            <View style={style.container}>
                <View style={style.modalContainer}>
                    <Text>
                        {`Voltaje: ${voltage} V\n`}
                        {`Corriente: ${current} A\n`}
                        {`Producción: ${production} kVAh\n`}
                        {`Frecuencia: ${frequency} Hz\n`}
                        {`Potencia Aparente: ${aparentPower} VA\n`}
                        {`Potencia Activa: ${activePower} W\n`}
                        {`Factor de potencia: ${powerFactor}\n`}
                        {`Cuadrante: ${quadrant} \n`}
                    </Text>
                    <Button 
                    title="Cerrar" 
                    onPress={()=>onPress()}
                    color={Colors.primary}/>
                </View>
            </View>
        </Modal>
    );
};

export default ModalData;