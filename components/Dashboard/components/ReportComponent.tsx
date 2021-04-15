import React from "react"
import { faFileDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableHighlight } from "react-native";
import { formatDate } from "../../../constants/formatDate";
import Colors from "../../../constants/Colors";
import style from "../style";

const ReportComponent: React.FC<any> = ({item, index}) =>{
    return(
        <View
        style={style.reportsContainer}>
            <Text>
                {`${formatDate(new Date(item.initDate))} - ${formatDate(new Date(item.finalDate))}`}
            </Text>
            <View
            style={style.reportsSubContainer}>
                <TouchableHighlight
                activeOpacity={0.6}
                underlayColor= {Colors.white}
                onPress={() => alert(`Report ${index + 1}!`)}>
                    <FontAwesomeIcon
                    size={20}
                    icon={faFileDownload}
                    color={Colors.black}/>
                </TouchableHighlight>
                
                <FontAwesomeIcon
                size={20}
                icon={faTrash}
                color={Colors.red}
                style={{marginLeft: 20}}/>
            </View>
        </View>
    )
};

export default ReportComponent;