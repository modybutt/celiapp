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
          <View style={[styles.container, { width: Dimensions.get('window').width }]}>
              <Text style={styles.text}>Name: </Text>
              <View style={[styles.textInputContainer, { width: Dimensions.get('window').width - 100 }]}>
                  <TextInputSingleLine ref={component => this._search = component} onTextChanged={this.nameEditedHandler}/>
              </View>
          </View>
        )
    }

}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    margin: 25
  },
  text: {
     fontSize: 15,
     fontWeight: 'bold',
  },
  textInputContainer: {
    paddingBottom: 18
  }
});
