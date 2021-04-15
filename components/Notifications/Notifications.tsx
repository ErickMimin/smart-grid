import React from 'react';
import { SafeAreaView, View, Text, SectionList} from 'react-native';
import { faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import Swipe from '../../constants/Swipe';
import Notification from './Notification';

const DATA = [
  {
    title: "Hoy",
    data: [{
      title: "Error",
      date: "Hace 1 hora",
      icon: faExclamationCircle
    },
    {
      title: "Advetencia",
      date: "Hace 2 horas",
      icon: faExclamationTriangle
    }]
  },
  {
    title: "Esta semana",
    data: [{
      title: "Error",
      date: "Hace 2 dias",
      icon: faExclamationCircle
    },
    {
      title: "Advetencia",
      date: "Hace 3 dias",
      icon: faExclamationTriangle
    }]
  }
];

const Notifications: React.FC<any> = ({navigation}) => {
  const panResponder = Swipe({
      swipeLeft: () => {
          navigation.navigate('Charts');
      },
      swipeRight: () => {
          navigation.navigate('Settings');
      }
  });
  return(
      <SafeAreaView style={styles.container} {...panResponder}>
          <SectionList
              sections={DATA}
              renderItem={({ item }) => <Notification item={item}/>}
              keyExtractor={(item, index) => item.title + index}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{padding: 10}} >{title}</Text>
              )}
          />
      </SafeAreaView>
  );
};

export default Notifications;