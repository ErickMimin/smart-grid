import React, { useEffect } from 'react';
import Notification from './components/Notification';
import { SafeAreaView, Text, SectionList} from 'react-native';
import { notificationsData } from '../../redux/selectors/index';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsAction } from '../../redux/actions/notifications';
import styles from './styles';


const Notifications: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(notificationsAction({}));
  }, []);

  const DATA = [
    {
      title: "Recientes",
      data: useSelector(state => notificationsData(state)) || []
    }
  ];

  return(
      <SafeAreaView style={styles.container}>
          <SectionList
              sections={DATA}
              renderItem={({ item }) => <Notification item={item}/>}
              keyExtractor={(item, index) => `${item.id + index}`}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{padding: 10}} >{title}</Text>
              )}
          />
      </SafeAreaView>
  );
};

export default Notifications;