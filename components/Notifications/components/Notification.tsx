import React from "react";
import { View, Text, TouchableHighlight, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationCircle, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { notificationsAction } from "../../../redux/actions/notifications";
import { apiCall } from "../../../redux/api";
import {formatDateSubComplete} from '../../../constants/formatDate';

import styles from "../styles";
import Colors from '../../../constants/Colors';
import AlertDelete from "../../../constants/AlertDelete";


const Notification: React.FC<{item: any, dispatch: any}> = ({item, dispatch}) => {
  const {type, description, date} = item;
  const deleteNotificationRequest = async (id: any) => {
    try{
        await apiCall(`reports/${id}`, null, null, 'DELETE');
        Alert.alert('Reporte eliminado correctamente');
        dispatch(notificationsAction({}));
    }catch(error){
        Alert.alert('Error: ' + error);
    }
  };
  
  const deleteNotification = (id: any) => {
    AlertDelete({
        title: `Borrar notificación ${id}`,
        content: "¿Está seguro que quiere eliminar esta notificación?\nEsta operación es irreversible.",
        onSucces: () => deleteNotificationRequest(id)
    });
  };
    return (
      <View style={styles.item}>
        <FontAwesomeIcon 
        size={50}
        icon={type === 'warning' ? faExclamationTriangle : faExclamationCircle}
        style={type === 'warning' ? {color: Colors.yellow} : {color: Colors.red}}/>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{description}</Text>
            <Text>{formatDateSubComplete(new Date(date))}</Text>
          </View>
            <TouchableHighlight
            activeOpacity={0.6}
            underlayColor= {Colors.white}
            onPress={()=>{deleteNotification(item.id)}}>
                <FontAwesomeIcon
                size={20}
                icon={faTrash}
                color={Colors.black}/>
            </TouchableHighlight>
        </View>
      </View>
    );
  };

  export default Notification;