import React from 'react';
import { View, Text } from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';


export default class SymptomViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("VIEW_SYMPTOM"),
        headerRight: <HeaderMenuButton onHeaderMenuSelected={(index) => navigation.state.params.onHeaderMenuSelected(index)}/>
    })

    state = {
        event: this.props.navigation.getParam("event"),
        edit: false,
    }

    componentDidMount() {        
        this.props.navigation.setParams({ 
            onHeaderMenuSelected: this.onHeaderMenuSelected.bind(this) ,
            // onCancelPressed: this.handleCancelButton.bind(this),
        })
    }

    onHeaderMenuSelected(index) {
        switch (index) {
          case 0: alert("EDIT"); break; // this.setState({edit: true})
          case 1: this.deleteEntry(); break;
        }
    }

    deleteEntry() {
        DatabaseManager.getInstance().deleteEvent(this.state.event.id, 
            (error) => {alert(error)}, 
            () => {GlutonManager.getInstance().setMessage(4)}
        );
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.state.event)}</Text>
            </View>
        )
    }
}