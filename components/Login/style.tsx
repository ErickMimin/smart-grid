import { Dimensions, StyleSheet } from "react-native";

/**
 * Estilos para el componente Login
 */
 const width = Dimensions.get('window').width / 2;
 export default StyleSheet.create({
     container:{
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center'
     },
     logo:{
         width: width,
         height: width,
         marginBottom: 50
     },
     tinyLogo:{
         width: width * .7,
         height: (width * .44) * .7,
     },
     input:{
         padding: 5,
         borderColor: '#101010',
         borderWidth: 1,
         borderRadius: 2,
         width: width
     },
     button: {
         marginTop: 10,
         width: width
     }
});