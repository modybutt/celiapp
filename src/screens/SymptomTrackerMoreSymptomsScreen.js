import React from 'react';
import { ScrollView, Button} from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import SymptomGroup from '../components/SymptomTracker/SymptomGroup';
import SymptomListRow from '../components/SymptomTracker/MoreSymptomsList/SymptomListRow'
import LanguageManager from '../manager/LanguageManager';
import SearchSymptomList from '../components/SymptomTracker/MoreSymptomsList/SearchSymptomList';
import ActionButton from 'react-native-action-button';
import HeaderSaveButton from '../components/HeaderSaveButton';

export default class SymptomTrackerMoreSymptomsScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("SYMPTOM_LIST"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)}/>
    })


    constructor(props){
        super(props)
        this.symptomSelectedIDsChangedHandler = this.symptomSelectedIDsChangedHandler.bind(this);
        this.state={
            tempDate: new Date(), //used to temporarliy save date and then set it to selectedDateAndTime after corresponding checks
            selectedSymptoms: [], //bit buggy when deleting existing symptoms from list
        }

    }

    componentDidMount() {
        this.props.navigation.setParams({ 
            onOkPressed: this.saveCurrentData.bind(this) ,
            onCancelPressed: this.handleCancelButton.bind(this) ,
        })
    }    

    handleCancelButton = () =>{   
        this.navigateHome()
    }

    navigateHome = () =>{
        this.props.navigation.goBack();
    }



    saveCurrentData = (goHome) =>{
        for (let symptom of this.state.selectedSymptoms) {
            let tmpDateTime = Date.now()
            // if(!(tmpDateTime.getFullYear() >= 1900)){
            //     tmpDateTime.setFullYear(tmpDateTime.getFullYear() + 1900);
            // }
            DatabaseManager.getInstance().createSymptomEvent(symptom[0], symptom[1], this.state.symptomEntryNote, tmpDateTime.getTime(), (error) => { alert(error)}, null);
        }

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }


    symptomSelectedIDsChangedHandler = (sympIDsAndSeverity) =>{
        //Alert.alert("symptomSelectedIDsChangedHandler called");
        this.setState({
            selectedSymptoms: sympIDsAndSeverity,
        })
    }

    render() {
        return (
            <ScrollView>
                <SymptomGroup showMore={true} navigation={this.props.navigation} />
            </ScrollView>
        )
    }
}

