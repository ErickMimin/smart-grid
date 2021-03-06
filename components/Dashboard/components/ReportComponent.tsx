import React from "react";
import { faFileAlt, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableHighlight, Alert } from "react-native";
import { formatDate } from "../../../constants/formatDate";
import { FileDownloader } from "../../../redux/api";
import { apiCall } from '../../../redux/api/index';
import { reportAction } from "../../../redux/actions/reports";
import Colors from "../../../constants/Colors";
import style from "../style";
import AlertDelete from "../../../constants/AlertDelete";


const ReportComponent: React.FC<any> = ({item, dispatch}) =>{

    const downloadFile = async (id: any) => {
        FileDownloader(`reports/${id}`, `reportsPDF${id}-${new Date().getTime()}.pdf`)
    };

    const downloadFileJson = async (id: any) => {
        FileDownloader(`reports/json/${id}`, `reportJSON${id}-${new Date().getTime()}.json`)
    };
    
    const deleteReportRequest = async (id: any) => {
        try{
            await apiCall(`reports/${id}`, null, null, 'DELETE');
            Alert.alert('Reporte eliminado correctamente');
            dispatch(reportAction({}));
        }catch(error){
            Alert.alert('Error: ' + error);
        }
    };
    
    const deleteReport = (id: any) => {
        AlertDelete({
            title: `Borrar reporte ${id}`,
            content: "¿Está seguro que quiere eliminar este reporte?\nEsta operación es irreversible.",
            onSucces: () => deleteReportRequest(id)
        });
    };


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
                onPress={() => downloadFile(item.reportId)}>
                    <FontAwesomeIcon
                    size={20}
                    icon={faFilePdf}
                    color={Colors.black}/>
                </TouchableHighlight>
                <TouchableHighlight
                activeOpacity={0.6}
                underlayColor= {Colors.white}
                onPress={() => downloadFileJson(item.reportId)}>
                    <FontAwesomeIcon
                    size={20}
                    icon={faFileAlt}
                    color={Colors.black}
                    style={{marginLeft: 20}}/>
                </TouchableHighlight>
                <TouchableHighlight
                activeOpacity={0.6}
                underlayColor= {Colors.white}
                onPress={() => deleteReport(item.reportId)}>
                    <FontAwesomeIcon
                    size={20}
                    icon={faTrash}
                    color={Colors.red}
                    style={{marginLeft: 20, marginRight: 10}}/>
                </TouchableHighlight>
                
            </View>
        </View>
    );
};

export default ReportComponent;