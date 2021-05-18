import React, { useEffect, useReducer } from 'react';
import { useState } from 'react';
import { View, Text, TouchableHighlight, Alert, Button } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import Sections from './Sections';
import style from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { settingsAction } from '../../redux/actions/settings';
import { settingsData } from '../../redux/selectors/index';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { apiCall } from '../../redux/api';
import AlertDelete from '../../constants/AlertDelete';
import { dashboardAction } from '../../redux/actions/dashboard';

const generateHours = (offset: number, supOffset?: number): Array<number> => {
    const hours: Array<any> = Array.from(new Array(25 - offset - (supOffset||0)));
    return hours.map((item, index) => index + offset);   
}

const reducer = (state: any, action: any) => {
    switch(action.type){
        case 'init':
            return {final: {...state.final, data: generateHours(action.value + 1)}, 
            init: {...state.init, value: action.value}}
        case 'final':
            return {...state, final: {...state.final, value: action.value}}
        default: 
            return state;
        }
}
    
const Settings: React.FC<any> = ({navigation}) => {
    const dispatch = useDispatch();
    const [activeSections, setActiveSections] = useState([0]);
    const settings = useSelector(state => settingsData(state)) || [];
    const [data, dataDispatch] = useReducer(reducer, {init: {data: generateHours(0, 1), value: 0}, final: {data: generateHours(1), value: 0}});
    
    const addHour = async () => {
        console.log(data.final.data[data.final.value])
        try{
            const response = await apiCall(`settings/range`, {
                init: data.init.data[data.init.value], 
                final: data.final.data[data.final.value]
            }, null, 'POST');
            if(!response.data.accept)
                throw 'Rango invalido';
            Alert.alert('Rango agregado correctamente');
            close();
            dispatch(settingsAction({}));
            dispatch(dashboardAction({data: true}));
        }catch(error){
            Alert.alert(error);
        }
    };

    const deleteHour = (id: any) => {
        AlertDelete({
            title: `Borrar rango`,
            content: "¿Está seguro que quiere eliminar este rango?\nEsta operación es irreversible.",
            onSucces: () => deleteHourRequest(id)
        });
    };

    const deleteHourRequest = async (id: any) => {
        try{
            await apiCall(`settings/range/${id}`, null, null, 'DELETE');
            Alert.alert('Rango eliminado correctamente');
            close();
            dispatch(settingsAction({}));
            dispatch(dashboardAction({data: true}));
        }catch(error){
            Alert.alert('Error: ' + error);
        }
    };

    const close = () => {
        setActiveSections([]);
    }

    const generateContent = (section: any) => {
        if(section.title === 'Cerrar sesión'){
            return(
                <View>
                    <Button 
                        title='Cerrar sesión'
                        color={Colors.green}
                        onPress={()=>{navigation.navigate('Login')}}/>
                </View>
            )
        }
        if(section.title === 'Ajustes'){
            return(
                <View>
                    <Text>{section.content}</Text>
                    {settings.map((setting: any, index: any) => (
                        <View key={`${index}-${setting.idRange}`} style={style.pickerContainer}>
                            <Picker
                            selectedValue={0}
                            style={style.picker}
                            enabled={false}>
                                <Picker.Item key={`${setting.init}`} label={`${setting.init}h`} value={0}/>
                            </Picker>
                            <Picker
                            style={style.picker}
                            selectedValue={0}
                            enabled={false}>
                                <Picker.Item key={`${setting.final}`} label={`${setting.final}h`} value={0}/>
                            </Picker>
                            <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor= {Colors.white}
                            onPress={() => deleteHour(setting.idRange)}>
                                <FontAwesomeIcon
                                size={25}
                                icon={faTimesCircle}
                                color={Colors.red}/>
                            </TouchableHighlight>
                        </View>
                    ))}
                    <View style={style.pickerContainer}>
                        <Picker
                        selectedValue={data.init.value}
                        style={style.picker}
                        onValueChange={(itemValue)=>dataDispatch({type: 'init', value: itemValue})}>
                            {data.init.data.map((hour: number, index: number) => (<Picker.Item key={`${index}`} label={`${hour}h`} value={index}/>))}
                        </Picker>
                        <Picker
                        style={style.picker}
                        selectedValue={data.final.value}
                        onValueChange={(itemValue)=>dataDispatch({type: 'final', value: itemValue})}>
                            {data.final.data.map((hour: number, index: number) => (<Picker.Item key={`${index}`} label={`${hour}h`} value={index}/>))}
                        </Picker>
                        <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor= {Colors.white}
                        onPress={() => addHour()}>
                            <FontAwesomeIcon
                            size={25}
                            icon={faPlusCircle}
                            color={Colors.green}/>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
        return(
            <Text style={{textAlign: 'justify'}}>{section.content}</Text>
        );
    }
    
    const renderContent = (section: any) => {
        return(
            <View style={style.container}>
                {generateContent(section)}
            </View>
        )
    };
    
    const renderHeader = (section: any) => {
        return(
            <View style={style.container}>
                <Text style={style.titleText}>{section.title}</Text>
            </View>
        )
    };

    useEffect(()=>{
        dispatch(settingsAction({}));
    }, []);

    return(
        <View>
            <Accordion
            sections={Sections}
            activeSections={activeSections}
            renderContent={renderContent}
            renderHeader={renderHeader}
            onChange={(sections)=>{setActiveSections(sections)}}/>
        </View>
    );
};

export default Settings;