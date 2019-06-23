import React from 'react';
import { Text, View, Dimensions, Alert, StyleSheet, Button} from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import LanguageManager from '../manager/LanguageManager';
import TextInputSingleLine from '../components/TextInputSingleLine';
import HeaderSaveButton from '../components/HeaderSaveButton';
import DatabaseManager from '../manager/DatabaseManager';
import USER_SYMPTOM_ICON from '../assets/images/SymptomTracker/userDefinedSymptom.png';

export default class SymptomTrackerAddNewScreen extends React.Component{
    static navigationOptions = ({navigation}) => ({
        title: LanguageManager.getInstance().getText("ADD_NEW_SYMPTOM"),
        headerLeft: <HeaderBackButton onPress={() => navigation.state.params.onCancelPressed()}/>,
        headerRight: <HeaderSaveButton onPress={() => navigation.state.params.onOkPressed(true)}/>
    })

    constructor(props){
        super(props)
        this.state={
            nameString: ""
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
        DatabaseManager.getInstance().createSymptom(this.state.nameString, USER_SYMPTOM_ICON, (error) => {alert(error)}, null);

        if (goHome) {
            setTimeout(() => this.navigateHome(), 100);
        }
    }

    nameEditedHandler = (name) =>{
        this.setState({
            nameString: name,
        });
    }

    render(){
        return(
            <View>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center', width: Dimensions.get('window').width, height: 80}}>
                    <Text style={styles.TextStyle}>Name: </Text>
                    <View style={{width:Dimensions.get('window').width-80, paddingBottom: 18}}>
                        <TextInputSingleLine ref={component => this._search = component} onTextChanged={this.nameEditedHandler}/>
                    </View>
                </View>       
            </View>
        )
    }

}

var styles = StyleSheet.create({
    TextStyle:{
       fontSize: 15,
       fontWeight: 'bold',
    }
   });