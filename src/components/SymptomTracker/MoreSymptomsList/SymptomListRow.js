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
        let tmpArray = this.state.symptomAndSeverityList;
        tmpArray.push([symptomID,severity])
        var arrayLength = tmpArray.length;
        this.props.onSelectedSymptomIDsChanged(tmpArray)
    }


    symptomDeselected(symptomID, severity){
        let tmpArray = this.state.symptomAndSeverityList;
        var arrayLength = tmpArray.length;
        var toFind = [symptomID,severity];
        for(var i = 0; i < arrayLength; i++){
            let toSearch = tmpArray[i, 0];
            if(toSearch.toString().localeCompare(toFind.toString())){
                tmpArray.splice(i,1);
            }
        }
        this.props.onSelectedSymptomIDsChanged(tmpArray)
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
                <View style={{height: 200}}>

                </View>
            </View>
     
    )}
}
