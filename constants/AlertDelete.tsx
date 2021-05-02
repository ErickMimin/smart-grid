import { Alert } from 'react-native';

const AlertDelete = ({title, content, onSucces}: {title: string, content: string, onSucces: Function}) => {
    Alert.alert(
        title,
        content,
        [   
            {
                text: "Cancelar"
            },
            { 
                text: "Aceptar", 
                onPress: () => onSucces()
            }
        ]
    );
};

export default AlertDelete;