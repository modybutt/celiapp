import React from 'react';
import { ScrollView, View, Text, Button} from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';
import Dialog from "react-native-dialog";
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import SymptomIconButton from '../components/SymptomTracker/SymptomIconButton';


export default class SymptomViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("VIEW_SYMPTOM"),
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null
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
            headerRight: () => (
                <Button
                  onPress={() => this.setState({showDeleteConfirmDialog: true})}
                  title={"Delete"}
                  color="#f00"
                />)
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
                <View style={{alignItems: 'center'}}>
                    <SymptomIconButton active={false} size="big" type={1} key={objData.symptomID} defaultSeverity={objData.severity} symptomID={objData.symptomID} symptomName={objData.name} symptomIcon={objData.icon} />
                </View>
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
						<Dialog.Button label={LanguageManager.getInstance().getText("NO")} onPress={() => this.setState({showDeleteConfirmDialog: false})} />
						<Dialog.Button label={LanguageManager.getInstance().getText("DELETE")} onPress={() => this.deleteEntry()} />
					</Dialog.Container>
				</View>
            </ScrollView>
        )
    }
}