import React from 'react';
import { View, Alert, StyleSheet, Button} from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import Dialog from "react-native-dialog";
import EmoteTrackerSymbolGroup from '../components/EmoteTracker/EmoteTrackerSymbolGroup';
import HorizontalLineWithText from '../components/HorizontalLineWithText';
import NoteEdit from '../components/NoteEdit';
import DatabaseManager from '../manager/DatabaseManager';


export default class EmoteTrackerScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <View style={{paddingRight: 10}}><Button title="SAVE" onPress={() => navigation.state.params.onOkPressed(true)}/></View>
    })

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

    componentDidMount() {        
        this.props.navigation.setParams({ 
            onOkPressed: this.saveCurrentData.bind(this) ,
            onCancelPressed: this.handleCancelButton.bind(this) ,
        })
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
                <View style={{paddingBottom: 10}} />

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


    saveCurrentData = (goHome) =>{
        DatabaseManager.getInstance().createEmotionEvent(this.state.selectedSymbolID, this.state.emoteNote, Date.now(), (error) => { alert(error)}, null);

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    navigateHome = () =>{
        this.props.navigation.goBack();
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