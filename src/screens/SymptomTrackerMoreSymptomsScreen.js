import React from 'react';
import { ScrollView, View, Button} from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import SymptomListRow from '../components/SymptomTracker/MoreSymptomsList/SymptomListRow'
import LanguageManager from '../manager/LanguageManager';


export default class SymptomTrackerMoreSymptomsScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("SYMPTOM_LIST"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <View style={{paddingRight: 10}}><Button title={LanguageManager.getInstance().getText("SAVE")} onPress={() => navigation.state.params.onOkPressed(true)}/></View>
    })


    constructor(props){
        super(props)
        this.state={

        }

    }



    render(){
        return(
            <ScrollView>
                <SymptomListRow/>
                <SymptomListRow/>
                <SymptomListRow/>
                <SymptomListRow/>
                <SymptomListRow/>
                <SymptomListRow/>
            </ScrollView>
        )
    }


}