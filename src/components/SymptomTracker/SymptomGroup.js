
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import SymptomIconButton  from './SymptomIconButton';
import {SYMPTOM_BUTTON_TYPES} from "./SymptomIconButtonConstants.js"
import DatabaseManager from '../../manager/DatabaseManager';
import CREATE_SYMPTOM_ICON from '../../assets/images/SymptomTracker/addSymptom.png';

const NUM_BUTTONS_IN_ROW = 4;

export default class SymptomGroup extends React.Component {

  constructor(props) {
    super(props);
    this.severityChooserHandler = this.severityChooserHandler.bind(this);
    this.symptomSelected = this.symptomSelected.bind(this)
    this.symptomDeselected = this.symptomDeselected.bind(this)
    this.state = {
      canOpenSeverityChooser: true,
      oneVisible: 0,
      twoVisible: 0,
      threeVisible: 0,
      fourVisible: 0,
      fiveVisible: 0,
      sixVisible: 0,
      sevenVisible: 0,
      eigthVisible: 0,
      backgroundVisible: -1,
      symptoms: null,
      loading: true,
      showMore: this.props.showMore == null ? false : this.props.showMore,
    }
  }

  noSymptomButton = {
    id: 0,
    name: "NO_SYMPTOMS",
    type: SYMPTOM_BUTTON_TYPES.NO_SYMPTOM,
    severity: 0,
    icon: ''
  }

  addNewSymptomButton = {
    id: 999,
    name: "Create Symptom",
    type: SYMPTOM_BUTTON_TYPES.CREATE_SYMPTOM,
    icon: CREATE_SYMPTOM_ICON
  }

  refreshSymptoms() {
    this.setState({ loading: true });

    DatabaseManager.getInstance().fetchSymptoms(
      (_, error) => { alert("Error fetching symptoms" + error) },
      (_, { rows: { _array } }) => {

        _array.unshift(this.noSymptomButton)
        _array.push(this.addNewSymptomButton)

        this.setState(
        {
          symptoms: _array,
          loading: false,
        })
      }
    );
  }

  severityChooserHandler(setActive, symptomID) {
    this.setState({
      canOpenSeverityChooser: setActive
    });
  }

  symptomSelected(symptomID, severity) { //severity: 1==yellow, 2==orange, 3==red
    let newList = this.props.selection.concat([{ symptomID, severity }]);
    this.props.onSelectionChanged(newList)
  }

  symptomDeselected(symptomID, severity) {
    let newList = this.props.selection.filter((entry => entry.symptomID != symptomID));
    this.props.onSelectionChanged(newList)
  }

  getSymptomButtonType = (symptomColumn, type) => {
    if(!!type)
      return type;
    else{
      switch (symptomColumn){
        case 0:
          type = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_LEFT;
          break;
        case 3:
          type = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_RIGHT;
          break;
        case 1:
        case 2:
        default:
          type = SYMPTOM_BUTTON_TYPES.SEVERITY_CHOOSER_CENTRE
          break;
      }
    }
    return type;
  }

  rowOfSymptomButtons(from, size) {
    let cluster = [];
    let symptomColumn = 0;

    for (k = from; k < (from + size) && k < this.state.symptoms.length; k++) {
      symptomColumn = (k % NUM_BUTTONS_IN_ROW);

      let symptom = this.state.symptoms[k];
      cluster.push(
        <SymptomIconButton 
          type={this.getSymptomButtonType(symptomColumn, symptom.type)}
          key={symptom.id}
          defaultSeverity={!!symptom.severity ? symptom.severity : 0}
          symptomID={symptom.id}
          symptomName={symptom.name}
          symptomIcon={symptom.icon}
          onSymptomDeleted={() => this.refreshSymptoms()}
          onSeverityChooserHandled={this.severityChooserHandler}
          canOpenSeverity={this.state.canOpenSeverityChooser}
          onSymptomSelected={this.symptomSelected}
          onSymptomDeselected={this.symptomDeselected} 
          navigation={this.props.navigation}
          />
      );
    }

    if (k < (from + size)) {
      // fill up with spacer
      while (k++ < (from + size)) {
        cluster.push(<SymptomIconButton key={k} opacity={0} />);
      }
    }

    return cluster;
  }

  renderAllSymptoms() {
    let symptomRows = [];

    for (i = 0; i < this.state.symptoms.length; i += NUM_BUTTONS_IN_ROW) {
      symptomRows.push(
        <View key={i} style={styles.groupContainer}>{this.rowOfSymptomButtons(i, NUM_BUTTONS_IN_ROW)}</View>)
    }

    return symptomRows
  }

  getDefaultSeverity(id) {
    let symptom = this.props.selection.find((entry) => entry.symptomID == id);

    if (symptom != null) {
      return symptom.severity;
    }

    return 0;
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <NavigationEvents onDidFocus={() => this.refreshSymptoms()} />
          <ActivityIndicator size='large' color='lightblue' />
        </View>
      );
    }
    else 
      return (
        <View>
          <NavigationEvents onDidFocus={() => this.refreshSymptoms()} />
          <View style={{ zIndex: 0, marginBottom: 50 }}>
            {this.renderAllSymptoms()}
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  groupContainer: {
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});