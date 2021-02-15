import React from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import LanguageManager from '../manager/LanguageManager';
import HeaderMenuButton from '../components/HeaderMenuButton';
import DatabaseManager from '../manager/DatabaseManager';
import GlutonManager from '../manager/GlutonManager';
import Dialog from "react-native-dialog";
import FoodDiaryImageEdit from '../components/FoodDiary/FoodDiaryImageEdit'
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import FoodDiaryRatingBar from '../components/FoodDiary/FoodDiaryRatingBar';
import ResultBlock from '../components/ResultDisplay'; 
import FoodDiaryTagEdit from '../components/FoodDiary/FoodDiaryTagEdit'

export default class FoodViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("VIEW_GIP_RESULT"),
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

        var resultDate = objData.timestamp;

        var displayBlock = {
            resultValue: 'Negative',
            accuracyPercentText: 100,
            dateValue: new Date(resultDate).getUTCDate() + '/' +  (new Date(resultDate).getUTCMonth()+1) + '/' +  new Date(resultDate).getUTCFullYear(),
            timeValue: new Date(resultDate).getUTCHours() + ':' + new Date(resultDate).getUTCMinutes(),
            resultState: objData.result
        };

        switch(objData.result) {
            case 0:
                displayBlock.resultValue = 'Gluten';
                displayBlock.accuracyPercentText = 100;
                displayBlock.resultState = 1;
              break;
            case 1:
                displayBlock.resultValue = 'No gluten';
                displayBlock.accuracyPercentText = 100;
                displayBlock.resultState = 0;
              break;
            case 2:
                displayBlock.resultValue = 'Inconclusive';
                displayBlock.accuracyPercentText = 50;
                displayBlock.resultState = 2;
               break;
            default:
                displayBlock.resultValue = 'Inconclusive';
                displayBlock.accuracyPercentText = 50;
                displayBlock.resultState = 2;
          }
        const tags = [
          LanguageManager.getInstance().getText("GLUTEN"),
          LanguageManager.getInstance().getText("NO_GLUTEN"),
          LanguageManager.getInstance().getText("UNSURE")
        ];
        
        return (
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <FoodDiaryImageEdit snapshot={objData.photo} active={false} size="medium" />
                </View>
                <HorizontalLineWithText text={LanguageManager.getInstance().getText("DATE")}/>
                <View style={{paddingBottom: 10}} />
                <ResultBlock dataBlock={displayBlock}></ResultBlock>
                <HorizontalLineWithText text = {LanguageManager.getInstance().getText("NOTES")}/>
                <View style={{paddingBottom: 10}}/>
                <View>
                  <Dialog.Container visible={this.state.showDeleteConfirmDialog}>
                    <Dialog.Title>{LanguageManager.getInstance().getText("DELETE")}</Dialog.Title>
                    <Dialog.Description>
                      {LanguageManager.getInstance().getText("DO_YOU_WANT_TO_DELETE")}
                    </Dialog.Description>
                    <Dialog.Button
                      label={LanguageManager.getInstance().getText("BACK")}
                      onPress={() => this.setState({showDeleteConfirmDialog: false})} />
                    <Dialog.Button label={LanguageManager.getInstance().getText("DELETE")} onPress={() => this.deleteEntry()} />
                  </Dialog.Container>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    headText:{
       fontSize: 20,
       textAlign: 'center',
       margin: 10
    },
});
//Expected Datablock Template
/**
 * 
 * var displayBlock = {
  resultValue: 20,
  accuracyPercentText: 2220,
  dateValue: '12/12/12',
  timeValue: '12:12',
  resultState: 3
}
 */