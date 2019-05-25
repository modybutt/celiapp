
import React from 'react';
import { View, Alert, StyleSheet, Button} from 'react-native';
import EmoteTrackerSymbolGroup from '../components/EmoteTracker/EmoteTrackerSymbolGroup';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import NoteEdit from '../components/NoteEdit';
import DatabaseManager from '../persistance/DatabaseManager';
import Dialog from "react-native-dialog";


export default class EmoteTrackerScreen extends React.Component{
    static navigationOptions = {
        title: 'Add Emotion',
    };

    constructor(props){
        super(props)
        this.noteEditedHandler = this.noteEditedHandler.bind(this);
        this.emotionChangedHandler = this.emotionChangedHandler.bind(this);
        this.state={
            show: false,
            selectedSymbolID: 0, // 0 --> none selected. 1: unhappy, ... , 5: happy
            emoteNote: "",
        }
    }

    noteEditedHandler = (note) =>{
        this.setState({
            emoteNote: note,
        });

        Alert.alert("Note: " + note)
    }

    emotionChangedHandler = (emotionID) =>{
        this.setState({
            selectedSymbolID: emotionID,
        });

        Alert.alert("Selected Emotion: " + emotionID)
    }

    //TODO Uplift selectedSymbolID

    render(){
        return(
            <View style={{marginTop: 50}}>
                <HorizontalLineWithText text = "Emotion"/>
                <EmoteTrackerSymbolGroup ref={component => this._dayChooser = component} onEmotionChanged={this.emotionChangedHandler}/>
                <HorizontalLineWithText text = "Note"/>
                <NoteEdit ref={component => this._noteEdit = component} onTextChanged={this.noteEditedHandler}/>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: 20,
                }}           
                >
                    <View>
                        <Button title = "OK" onPress={() => this.saveCurrentData()}/>
                    </View>
                    <View>
                        <Button title = "Cancel" onPress={() => this.handleCancelButton()}/>
                    </View>
                </View>

                {/*Dialog for Day Change Save Dialog*/}
                <View>
                    <Dialog.Container visible={this.state.cancelSaveDialogVisible}>
                    <Dialog.Title>Cancel</Dialog.Title>
                    <Dialog.Description>
                        Do you really want to discard the entries?
                    </Dialog.Description>
                    <Dialog.Button label="Back" onPress={this.handleBack} />
                    <Dialog.Button label="Discard" onPress={this.handleDiscard} />
                    </Dialog.Container>
                </View>

            </View>
        )
    }


    saveCurrentData = () =>{
        //TODO: Save Data, obviously
        this.navigateHome()

    }

    navigateHome = () =>{
        this.props.navigation.navigate('Home');
    }

    handleCancelButton = () =>{
        if(!this.state.selectedSymbolID == 0){
            this.showBackDiscardDialog()
        }else{
            this.navigateHome()
        }
    }

    showBackDiscardDialog = () => {
        this.setState({ cancelSaveDialogVisible: true });
      };

      handleBack = () => {
        this.setState({ cancelSaveDialogVisible: false });
      };

      handleDiscard = () => {
        this.navigateHome()
        this.setState({ cancelSaveDialogVisible: false });
      };


}

var styles = StyleSheet.create({
 headText:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10
 }
});