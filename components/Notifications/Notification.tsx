import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const Notification: React.FC<{item: any}> = ({item}) => {
    const {icon, title, date} = item;
    return (
      <View style={styles.item}>
        <FontAwesomeIcon 
        size={50}
        icon={icon}
        style={icon === faExclamationTriangle ? {color: '#eed202'} : {color: '#f32013'}}/>
        <View style={{marginLeft: 10}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{date}</Text>
        </View>
      </View>
    );
  };

  export default Notification;