import React from 'react';
import { SafeAreaView, View, Text, SectionList} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from './styles';
import { faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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

const Item: React.FC<{item: any}> = ({item}) => {
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

const Dashboard: React.FC<{}> = () => {
    return(
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={DATA}
                renderItem={({ item }) => <Item item={item}/>}
                keyExtractor={(item, index) => item.title + index}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={{padding: 10}} >{title}</Text>
                )}
            />
        </SafeAreaView>
    );
};

export default Dashboard;