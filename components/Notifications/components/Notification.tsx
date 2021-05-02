import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationCircle, faExclamationTriangle, faTrash } from '@fortawesome/free-solid-svg-icons';

import {formatDateSubComplete} from '../../../constants/formatDate';
import styles from "../styles";
import Colors from '../../../constants/Colors';

const Notification: React.FC<{item: any}> = ({item}) => {
    const {type, description, date} = item;
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
            onPress={() => {}}>
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