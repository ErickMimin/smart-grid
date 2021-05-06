import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getHeader = async () =>{
    try {
        const header = await AsyncStorage.getItem('@header');
        return header != null ? JSON.parse(header) : null
    } catch(error) {
        Alert.alert("No se pudo leer el header");
    }
    return null;
}
// const BASE_URL = 'http://192.168.0.35:5000/smart-gr/us-central1/widgets/';
const BASE_URL = 'http://04159689553b.ngrok.io/';
const DOWNLOAD_PATH = 'file:///storage/emulated/0/Download/';
const HEADER =  getHeader();


export const apiCall = (url: any, data: any, headers: any, method: any) => axios({
    method,
    url: BASE_URL + url,
    data, 
    headers: {"x-request-id":"c2Vuc29yMTIzNA=="}
});

// https://docs.expo.io/versions/latest/sdk/filesystem/
export const FileDownloader = async (url: string, filename: string) => {
    try {
        const permission = await MediaLibrary.getPermissionsAsync();
        if(permission.status !== 'granted')
            MediaLibrary.requestPermissionsAsync();
        const downloadResumable = FileSystem.createDownloadResumable(
            BASE_URL + url,
            DOWNLOAD_PATH + filename,
            {
                headers:{
                    "x-request-id": "c2Vuc29yMTIzNA=="
                }
            }
        );
        const result = await downloadResumable.downloadAsync();
        Alert.alert('Archivo decargado correctamente en: ' + result?.uri);
    } catch (error) {
        Alert.alert('Error: ' + error);
    }
}