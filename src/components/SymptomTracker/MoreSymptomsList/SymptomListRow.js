import React from 'react';
import {View, Text} from 'react-native';
import HorizontalLine from '../../HorizontalLine';
import SymptomIconButton from '../SymptomIconButton';


export default class SymptomListRow extends React.Component {

    constructor(props){
        super(props);
        this.severityChooserHandler = this.severityChooserHandler.bind(this);
        this.symptomSelected = this.symptomSelected.bind(this)
        this.symptomDeselected = this.symptomDeselected.bind(this)
        this.state = {
            canOpenSeverityChooser: true,
        }
    }

    severityChooserHandler(setActive, symptomID){
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

    symptomSelected(symptomID, severity){ //severity: 1==yellow, 2==orange, 3==red
    }

    symptomDeselected(symptomID, severity){
    }

    render(){
        return(
              <View style={{zIndex: 0}}>
                <View style={{
                    height:130,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 50,
                }}>
                    <View>
                        <SymptomIconButton ref={component => this._sympIc1 = component} type = {1} symptomID={9} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    </View>
                    <View>
                        <SymptomIconButton ref={component => this._sympIc2 = component} type = {2} symptomID={9} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    </View>
                    <View>
                        <SymptomIconButton ref={component => this._sympIc4 = component} type = {3} symptomID={9} onSeverityChooserHandled = {this.severityChooserHandler} canOpenSeverity = {this.state.canOpenSeverityChooser} onSymptomSelected = {this.symptomSelected} onSymptomDeselected = {this.symptomDeselected}/>
                    </View>              
                </View>
            </View>
     
    )}
}
