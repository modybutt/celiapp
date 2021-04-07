
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import SymptomIconButton from './SymptomIconButton';
import { SYMPTOM_BUTTON_TYPES } from "./SymptomIconButtonConstants.js"
import DatabaseManager from '../../manager/DatabaseManager';
import NO_SYMPTOM from '../../assets/images/SymptomTracker/symptom_icon.png';

const NUM_BUTTONS_IN_ROW = 4;

export default class SymptomGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      severityChooserOpenID: -1,
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
    this.props.onSelectionChanged(list)
  }

  symptomDeselected = (symptomID) => {
    let newList = this.props.selection.filter((entry => entry.symptomID != symptomID));
    this.props.onSelectionChanged(newList)
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
      cluster.push(
        <SymptomIconButton
          type={this.getSymptomButtonType(symptomColumn, symptom.type)}
          key={symptom.id}
          severity={this.getCurrentSeverity(symptom.id)}
          symptomID={symptom.id}
          symptomName={symptom.name}
          symptomIcon={symptom.icon}
          severityChooserOpen={symptom.id == this.state.severityChooserOpenID ? true : false}
          symptomSelected={this.symptomSelected}
          symptomDeselected={this.symptomDeselected}
          severityChooserOpenHandler={this.severityChooserOpenHandler}
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
    symptomRows.push(
      <View key={0} style={styles.groupContainer}>{this.rowOfSymptomButtons(0, 1)}</View>)
    for (i = 1; i < (this.state.symptoms.length); i += NUM_BUTTONS_IN_ROW) {
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
          <NavigationEvents onDidFocus={this.refreshSymptoms} />
          <ActivityIndicator size='large' color='lightblue' />
        </View>
      );
    }
    else
      return (
        <View>
          <NavigationEvents onDidFocus={this.refreshSymptoms} />
          <View >
            {this.renderAllSymptoms()}
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  groupContainer: {
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
  },
});