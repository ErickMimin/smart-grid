import 'react-native-gesture-handler';
import React from 'react';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Notifications from './components/Notifications/Notifications';
import Settings from './components/Settings/Settings';
import Charts from './components/Charts/Charts';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

import Colors from './constants/Colors';

import configureStore from './redux/store';
const store = configureStore();

const Stack = createStackNavigator();

export default function App() {
  useFonts({
    Roboto_400Regular,
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator   
      screenOptions={{
        headerLeft: (props) => {return null},
        headerTitle: props => <Header {...props}/>,
        headerStyle: {
          backgroundColor: Colors.primary
        },
        headerTitleContainerStyle:{
          height: '100%'
        },
        animationEnabled: false,
        cardStyle: {
          backgroundColor: Colors.white
        }
      }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={Dashboard}
        />
        <Stack.Screen
          name="Charts"
          component={Charts}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}