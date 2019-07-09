import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';
import Dialog from "react-native-dialog";
import EmoteTrackerSymbolGroup from '../components/EmoteTracker/EmoteTrackerSymbolGroup';
import HorizontalLineWithText from '../components/HorizontalLineWithText';


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
          case 0: break; // this.setState({edit: true})
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
        let objData = JSON.parse(this.state.event.objData);

        return (
            <ScrollView>
                <EmoteTrackerSymbolGroup active={false} emoteID={objData.type} size="big" />
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("DATE")}/>
                <Text>{LanguageManager.getInstance().getDateAsText(this.state.event.created)}</Text>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NOTES")}/>
                <Text>{objData.note}</Text>
                <View style={{paddingBottom: 10}} />

                <View>
					<Dialog.Container visible={this.state.showDeleteConfirmDialog}>
						<Dialog.Title>{LanguageManager.getInstance().getText("DELETE")}</Dialog.Title>
						<Dialog.Description>
						{LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DELETE")}
						</Dialog.Description>
						<Dialog.Button label={LanguageManager.getInstance().getText("BACK")} onPress={() => this.setState({showDeleteConfirmDialog: false})} />
						<Dialog.Button label={LanguageManager.getInstance().getText("DELETE")} onPress={() => this.deleteEntry()} />
					</Dialog.Container>
				</View>
            </ScrollView>
        )
    }
}