import React, { useEffect, useState } from 'react';
import Notification from './components/Notification';
import { SafeAreaView, Text, SectionList, View, ActivityIndicator, TouchableHighlight, Alert} from 'react-native';
import { notificationsData, isNotificationsLoading } from '../../redux/selectors/index';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsAction } from '../../redux/actions/notifications';
import styles from './styles';
import Colors from '../../constants/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { apiCall } from '../../redux/api';
import AlertDelete from '../../constants/AlertDelete';


const Notifications: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => isNotificationsLoading(state));
  const [state, setState] = useState(false);

  const switchNotifications = () => {
    AlertDelete({
        title: `${state ? 'Desactivar' : 'Activar'} notificaciones`,
        content: `¿Está seguro que quiere ${state ? 'desactivar' : 'activar'} las notificaciones?`,
        onSucces: () => switchNotificationsPut()
    });
};

  const switchNotificationsPut = async () => {
      try{
          const res = await apiCall(`notifications/disabled`, null, null, 'PUT');
          switchNotificationsRequest();
      }catch(error){
          Alert.alert('No se pudo cambiar las notificaciones');
      }
  };

  const switchNotificationsRequest = async () => {
      try{
          const res = await apiCall(`notifications/disabled`, null, null, 'GET');
          setState(res.data);
      }catch(error){
          setState(false);
      }
  };

  useEffect(()=>{
    dispatch(notificationsAction({})); 
    switchNotificationsRequest(); 
  }, []);

  const DATA = [
    {
      title: "Notificaciones",
      data: useSelector(state => notificationsData(state)) || []
    }
  ];

  if(isLoading)
    return(
      <View
          style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary}/>
      </View>
    )

  return(
    <SafeAreaView style={styles.container}>
      <SectionList
          sections={DATA}
          renderItem={({ item }) => <Notification item={item} dispatch={dispatch}/>}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.header}>
              <Text style={{padding: 10}} >{title}</Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor= {Colors.white}
                onPress={() => switchNotifications()}>
                    <FontAwesomeIcon
                    size={25}
                    icon={state ? faBell : faBellSlash}
                    color={Colors.greyBlack}/>
                </TouchableHighlight>
            </View>
          )}
      />
    </SafeAreaView>
  );
};

export default Notifications;