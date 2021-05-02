import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

// const baseURL = 'http://192.168.0.35:5000/smart-gr/us-central1/widgets/';
const baseURL = 'http://a61025985bfc.ngrok.io/';
const DOWNLOAD_PATH = 'file:///storage/emulated/0/Download/';

export const apiCall = (url: any, data: any, headers: any, method: any) => axios({
    method,
    url: baseURL + url,
    data, 
    headers: headers || {
        "x-request-id": "c2Vuc29yMTIzNA=="
    }
});

// https://docs.expo.io/versions/latest/sdk/filesystem/
export const FileDownloader = async (url: string, filename: string) => {
    try {
        const permission = await MediaLibrary.getPermissionsAsync();
        if(permission.status !== 'granted'){
            MediaLibrary.requestPermissionsAsync();
        }else throw('Hace falta el permiso de guardado.')
        const downloadResumable = FileSystem.createDownloadResumable(
            baseURL + url,
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