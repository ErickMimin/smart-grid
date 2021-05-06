import React, { useState } from 'react';
import { Switch, View, Text, Button, Alert, SafeAreaView } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../constants/Colors';
import Style from './Style';

const Charts: React.FC<any> = ({navigation}) => {
    const [type, setType] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setType(previousState => !previousState);

    return(
        <SafeAreaView style={{marginHorizontal: 10}}>
            <View style={Style.switchContainer}>
                <Text style={{marginRight: 10}}>Dia</Text>
                <Switch
                    trackColor={{ false: Colors.grey, true: Colors.grey }}
                    thumbColor={Colors.primary}
                    ios_backgroundColor={Colors.white}
                    onValueChange={toggleSwitch}
                    value={type}/>
                <Text style={{marginLeft: 10}}>Mes</Text>
            </View>
            <View style={Style.buttonContainer}>
                <Button
                title="Fecha inicio"
                onPress={() => setIsEnabled(true)}
                color={Colors.primary}/>
                <Button
                title="Fecha final"
                onPress={() => Alert.alert('Right button pressed')}
                color={Colors.primary}/>
            </View>
            {isEnabled && 
                <RNDateTimePicker 
                    mode="date" 
                    value={new Date()} 
                    onChange={()=>{setIsEnabled(false)}}/>}
        </SafeAreaView>
    );
};

export default Charts;