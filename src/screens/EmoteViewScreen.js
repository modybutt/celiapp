import React from 'react';
import { View, Text } from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';
import Dialog from "react-native-dialog";


export default class EmoteViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("VIEW_EMOTION"),
        headerRight: <HeaderMenuButton onHeaderMenuSelected={(index) => navigation.state.params.onHeaderMenuSelected(index)}/>
    })

    state = {
        event: this.props.navigation.getParam("event"),
        edit: false,
        showDeleteConfirmDialog: false,
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
          case 1: this.setState({showDeleteConfirmDialog: true}); break;
        }
    }

    deleteEntry() {
        DatabaseManager.getInstance().deleteEvent(this.state.event.id, 
            (error) => {alert(error)}, 
            () => {
                GlutonManager.getInstance().setMessage(4);
                this.props.navigation.goBack();
            }
        );
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.state.event)}</Text>

                <View>
					<Dialog.Container visible={this.state.showDeleteConfirmDialog}>
						<Dialog.Title>{LanguageManager.getInstance().getText("DELETE")}</Dialog.Title>
						<Dialog.Description>
						{LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DELETE")}
						</Dialog.Description>
						<Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={() => this.setState({showDeleteConfirmDialog: false})} />
						<Dialog.Button label={LanguageManager.getInstance().getText("DISCARD")} onPress={() => this.deleteEntry()} />
					</Dialog.Container>
				</View>
            </View>
        )
    }
}