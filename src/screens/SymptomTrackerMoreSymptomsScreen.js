import React from 'react';
import { View, ScrollView } from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import MenuButton from '../components/MenuButton';
import LanguageManager from '../manager/LanguageManager';
import DatabaseManager from '../manager/DatabaseManager';
import HeaderSaveButton from '../components/HeaderSaveButton';

export default class SymptomTrackerMoreSymptomsScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("SYMPTOM_LIST"),
        // headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        // headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)} type={1}/>
    })


    constructor(props){
        super(props)
        this.symptomSelectionChangeHandler = this.symptomSelectionChangeHandler.bind(this);
        this.state={
            selectedSymptoms: this.props.navigation.getParam("symptoms"),
        }

    }

    // componentDidMount() {
    //     this.props.navigation.setParams({ 
    //         onOkPressed: this.saveCurrentData.bind(this) ,
    //         onCancelPressed: this.handleCancelButton.bind(this) ,
    //     })
    // }    

    // handleCancelButton = () =>{   
    //     this.navigateHome()
    // }

    // navigateHome = () =>{
    //     this.props.navigation.goBack();
    // }



    // saveCurrentData = (goHome) =>{
    //     for (let symptom of this.state.selectedSymptoms) {
    //         alert(JSON.stringify(symptom))
    //         // let tmpDateTime = Date.now()
    //         // if(!(tmpDateTime.getFullYear() >= 1900)){
    //         //     tmpDateTime.setFullYear(tmpDateTime.getFullYear() + 1900);
    //         // }
    //         // DatabaseManager.getInstance().createSymptomEvent(symptom[0], symptom[1], this.state.symptomEntryNote, tmpDateTime.getTime(), (error) => { alert(error)}, null);
    //     }

    //     if (goHome) {
    //         setTimeout(() => this.navigateHome(), 100);
    //     }
    // }


    symptomSelectionChangeHandler = (sympIDsAndSeverity) =>{
        this.setState({
            selectedSymptoms: sympIDsAndSeverity,
        })
        this.props.navigation.getParam("cb")(sympIDsAndSeverity)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <SymptomGroup showMore={true} selection={this.state.selectedSymptoms} navigation={this.props.navigation} ref={component => this._symptomGroup = component} onSelectionChanged={this.symptomSelectionChangeHandler} />
                </ScrollView>
                <MenuButton type={1} navigation={this.props.navigation}/>  
            </View>
        )
    }
}

