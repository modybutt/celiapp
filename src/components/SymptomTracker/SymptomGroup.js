
import React from 'react';
import {Icon, View, Text, Alert} from 'react-native';
import SymptomIcon from './SymptomIcon';
import SymptomIconButton from './SymptomIconButton';
import MoreSymptomsButton from './MoreSymptomsButton'
import HorizontalLineWithText from '../HorizontalLineWithText';
import HorizontalLine from '../HorizontalLine';


export default class SymptomGroup extends React.Component{

    constructor(props) {
       super(props);
       this.severityChooserHandler = this.severityChooserHandler.bind(this);
       this.state = {
           canOpenSeverityChooser: true,
       } 
    }
    

    severityChooserHandler(setActive){
        if(setActive){
            this.setState({
                canOpenSeverityChooser: true,
            });
        }else{
            this.setState({
                canOpenSeverityChooser: false,
            });
        }

    }



    render(){
        return(
            <View>
                <View style={{
                    height:150,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 25,
                }}>
                    <SymptomIconButton type = {1} symptomID={1} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                    <SymptomIconButton type = {2} symptomID={2} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                    <SymptomIconButton type = {2} symptomID={3} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                    <SymptomIconButton type = {3} symptomID={4} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                </View>
                <View style={{
                    height:150,
                    flexDirection:'row',
                    justifyContent: 'space-around',
                    alignItems:'center',
                }}>
                    <SymptomIconButton type = {1} symptomID={5} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                    <SymptomIconButton type = {2} symptomID={6} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                    <SymptomIconButton type = {2} symptomID={7} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                    <SymptomIconButton type = {4} symptomID={8} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser}/>
                </View>
                <HorizontalLine />
            </View>
        )
    }
}