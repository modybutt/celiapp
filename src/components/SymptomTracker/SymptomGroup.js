import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import SymptomIconButton from './SymptomIconButton';
import { SYMPTOM_BUTTON_TYPES } from "./SymptomIconButtonConstants.js"
import DatabaseManager from '../../manager/DatabaseManager';
import NO_SYMPTOM from '../../assets/images/SymptomTracker/symptom_icon.png';
import SymptomSeverityChooser from "./SymptomSeverityChooser";

const NUM_BUTTONS_IN_ROW = 4;

export default class SymptomGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      severityChooserOpenID: -1,
      symptoms: null,
      loading: true,
      showMore: this.props.showMore == null ? false : this.props.showMore,
      buttonLayouts: {},
      groupLayouts: {},
    }
  }

  noSymptomButton = {
    id: 0,
    name: "NO_SYMPTOMS",
    type: SYMPTOM_BUTTON_TYPES.NO_SYMPTOM,
    severity: 0,
    icon: NO_SYMPTOM
  }

  refreshSymptoms = () => {
    this.setState({ loading: true });

    DatabaseManager.getInstance().fetchSymptoms(
      (_, error) => { alert("Error fetching symptoms" + error) },
      (_, { rows: { _array } }) => {

        _array.unshift(this.noSymptomButton)
        //remove self defined symptom types
        _array = _array.filter((entry => entry.id <= 12))

        this.setState(
          {
            symptoms: _array,
            loading: false,
          })
      }
    );
  }

  severityChooserOpenHandler = (setActive, symptomID) => {
    if (setActive == false && symptomID == this.state.severityChooserOpenID) {
      this.setState({
        severityChooserOpenID: -1
      });
    }
    else if (setActive == true && this.state.severityChooserOpenID == -1) {
      this.setState({
        severityChooserOpenID: symptomID
      });
    }
  }

  symptomSelected = (symptomID, severity) => {
    let list = [];
    if (symptomID != 0) {
      list = this.props.selection.filter((entry => entry.symptomID != symptomID));
      list = list.concat([{ symptomID, severity }]);
    }
    this.props.onSelectionChanged(list);
    this.setState({
      severityChooserOpenID: -1
    });
  }

  symptomDeselected = (symptomID) => {
    let newList = this.props.selection.filter((entry => entry.symptomID != symptomID));
    this.props.onSelectionChanged(newList);
    this.setState({
      severityChooserOpenID: -1
    });
  }

  getSymptomButtonType = (symptomColumn, type) => {
    if (!!type)
      return type;
    else {
      switch (symptomColumn) {
        case 0:
          type = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_LEFT;
          break;
        case 3:
          type = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_RIGHT;
          break;
        case 1:
        case 2:
        default:
          type = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_CENTRE;
          break;
      }
    }
    return type;
  }

  getCurrentSeverity = (id) => {
    let list = this.props.selection.filter((entry => entry.symptomID == id));
    if (this.props.selection.length == 0 && id == 0) {
      return 1;
    } else {
      if (list.length > 0) {
        return list[0].severity;
      }
      else {
        return 0;
      }
    }
  }

  rowOfSymptomButtons(from, size) {
    let cluster = [];
    let symptomColumn = 0;

    for (k = from; k < (from + size) && k < this.state.symptoms.length; k++) {
      symptomColumn = ((k - 1) % NUM_BUTTONS_IN_ROW);
      let symptom = this.state.symptoms[k];
      let index = k;
      cluster.push(
        <View 
        key={"button"+symptom.id}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          this.addButtonLayout(index, symptom.id, layout);
        }} >
          <SymptomIconButton
            type={this.getSymptomButtonType(symptomColumn, symptom.type)}          
            severity={this.getCurrentSeverity(symptom.id)}
            symptomID={symptom.id}
            symptomName={symptom.name}
            symptomIcon={symptom.icon}
            severityChooserOpen={symptom.id == this.state.severityChooserOpenID ? true : false}
            symptomSelected={this.symptomSelected}
            symptomDeselected={this.symptomDeselected}
            severityChooserOpenHandler={this.severityChooserOpenHandler}
          />
        </View>
      );
    }

    
    if (k < (from + size)) {
      // fill up with spacer
      while (k++ < (from + size)) {
        cluster.push(<SymptomIconButton opacity={0} />);
      }
    }
    
    return cluster;
  }

  renderAllSymptoms() {
    let symptomRows = [];
    symptomRows.push(
      <View
        key="row0"
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          this.addGroupLayout(0, layout);
        }}
        style={styles.groupContainer}>{this.rowOfSymptomButtons(0, 1)}
      </View>)

    for (i = 1; i < (this.state.symptoms.length); i += NUM_BUTTONS_IN_ROW) {
      let index = i;
      symptomRows.push(
        <View
          key={"row"+i}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            this.addGroupLayout(index, layout);
          }}
          style={styles.groupContainer}>{this.rowOfSymptomButtons(i, NUM_BUTTONS_IN_ROW)}
        </View>)
    }
    return symptomRows;
  }
  
  getDefaultSeverity(id) {
    let symptom = this.props.selection.find((entry) => entry.symptomID == id);
    if (symptom != null) {
      return symptom.severity;
    }
    return 0;
  }

  addButtonLayout(index, id, layout) {
    if (!(id in this.state.buttonLayouts)) {
      const tmpButtonLayouts = {...this.state.buttonLayouts};
      tmpButtonLayouts[id] = [index, layout];
      this.setState({buttonLayouts:tmpButtonLayouts})
    }
  }

  addGroupLayout(groupindex, layout) {
    if (!(groupindex in this.state.groupLayouts)) {
      const tmpGroupLayouts = {...this.state.groupLayouts};
      tmpGroupLayouts[groupindex] = layout;
      this.setState({groupLayouts:tmpGroupLayouts})
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <NavigationEvents onDidFocus={this.refreshSymptoms} />
          <ActivityIndicator size='large' color='lightblue' />
        </View>
      );
    }
    else {
      if (this.state.severityChooserOpenID > 0) {

        let index = this.state.buttonLayouts[this.state.severityChooserOpenID][0];
        let buttonLayout = this.state.buttonLayouts[this.state.severityChooserOpenID][1];
        let groupindex = (((index - 1) / NUM_BUTTONS_IN_ROW) | 0) * NUM_BUTTONS_IN_ROW + 1;
        let groupLayout = this.state.groupLayouts[groupindex];
        let position = {
          top: groupLayout.y + buttonLayout.y + (buttonLayout.height/2),
          left: groupLayout.x + buttonLayout.x + (buttonLayout.width/2)
        }
        let orientation = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_CENTRE;
        if (index%NUM_BUTTONS_IN_ROW === 0){
          orientation = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_LEFT;
        }else if(index%NUM_BUTTONS_IN_ROW === 1){
          orientation = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_RIGHT;
        }
        

        return (
          <View>
              <View>
              {this.renderAllSymptoms()}
              </View>
              <SymptomSeverityChooser
              position={position}
              orientation={orientation}
              onPressLow={() => this.symptomSelected(this.state.severityChooserOpenID, 1)}
              onPressMedium={() => this.symptomSelected(this.state.severityChooserOpenID, 2)}
              onPressHigh={() => this.symptomSelected(this.state.severityChooserOpenID, 3)}
            >
            </SymptomSeverityChooser>
          </View>
        );
      }
      else {
        return (
          <View>
            <View >
              {this.renderAllSymptoms()}
            </View>

          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
  },
});