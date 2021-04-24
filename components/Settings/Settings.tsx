import React from 'react';
import {useState} from 'react';
import { View, Text } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import Swipe from '../../constants/Swipe';
import Sections from './Sections';
import style from './Style';

const renderContent = (section: any) => {
    return(
        <View style={style.container}>
            <Text style={{textAlign: 'justify'}}>{section.content}</Text>
        </View>
    )
};

const renderHeader = (section: any) => {
    return(
        <View style={style.container}>
            <Text style={style.titleText}>{section.title}</Text>
        </View>
    )
};

const Settings: React.FC<any> = ({navigation}) => {
    const [activeSections, setActiveSections] = useState([0]);
    const panResponder = Swipe({
        swipeLeft: () => {
            navigation.navigate('Notifications');
        },
        swipeRight: null
    });
    return(
        <View {...panResponder}>
            <Accordion
            sections={Sections}
            activeSections={activeSections}
            renderContent={renderContent}
            renderHeader={renderHeader}
            onChange={(sections)=>{setActiveSections(sections)}}
        />
        </View>
    );
};

export default Settings;