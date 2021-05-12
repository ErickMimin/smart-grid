import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getHeader = async () => {
    try {
        return await AsyncStorage.getItem('@header');
    } catch(error) {
        Alert.alert("No se pudo leer el header");
    }
    return null;
}
// const BASE_URL = 'http://192.168.0.35:5000/smart-gr/us-central1/widgets/';
const BASE_URL = 'http://06ad0d09cb3a.ngrok.io/';
const DOWNLOAD_PATH = 'file:///storage/emulated/0/Download/';



export const apiCall = async (url: any, data: any, headers: any, method: any) => {
    const header = await getHeader();
    const reqId = header != null ? {"x-request-id": header} : null;
    return axios({
        method,
        url: BASE_URL + url,
        data, 
        headers: headers == null ? reqId : {reqId, ...headers}
    })
};

const callback = (downloadProgress: any) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
};

// https://docs.expo.io/versions/latest/sdk/filesystem/
export const FileDownloader = async (url: string, filename: string) => {
    const header = await getHeader() || '';
    try {
        const permission = await MediaLibrary.getPermissionsAsync();
        if(permission.status !== 'granted')
            MediaLibrary.requestPermissionsAsync();
        const downloadResumable = FileSystem.createDownloadResumable(
            BASE_URL + url,
            DOWNLOAD_PATH + filename,
            {
                headers:{
                    "x-request-id": header
                }
            }
        );
        const result = await downloadResumable.downloadAsync();
        Alert.alert('Descarga Completada', filename + ' decargado correctamente en: ' + result?.uri);
    } catch (error) {
        Alert.alert('Error: ' + error);
    }
}