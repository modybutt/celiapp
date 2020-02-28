
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import SymptomIconButton from './SymptomIconButton';
import DatabaseManager from '../../manager/DatabaseManager';


const CLUSTER_SIZE = 4;

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

  refreshSymptoms() {
    this.setState({ loading: true });

    DatabaseManager.getInstance().fetchSymptoms(
      (_, error) => { alert("Error fetching symptoms" + error) },
      (_, { rows: { _array } }) => this.setState(
        {
          symptoms: _array,
          //error: res.error || null,
          loading: false,
        })
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

  groupSymptoms(from, size) {
    let cluster = [];
    let symptomPos = 0;

    for (k = from; k < (from + size) && k < this.state.symptoms.length; k++) {
      symptomPos = (k % CLUSTER_SIZE);

      let type;
      if (symptomPos == 0) {
        type = 1;
      } else if (symptomPos == 1 || symptomPos == 2) {
        type = 2;
      } else {
        type = 3;
      }

      cluster.push(
        <SymptomIconButton type={type}
          key={this.state.symptoms[k].id}
          defaultSeverity={this.getDefaultSeverity(this.state.symptoms[k].id)}
          symptomID={this.state.symptoms[k].id}
          symptomName={this.state.symptoms[k].name}
          symptomIcon={this.state.symptoms[k].icon}
          onSymptomDeleted={() => this.refreshSymptoms()}
          onSeverityChooserHandled={this.severityChooserHandler}
          canOpenSeverity={this.state.canOpenSeverityChooser}
          onSymptomSelected={this.symptomSelected}
          onSymptomDeselected={this.symptomDeselected} />
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

  renderMoreSymptoms() {
    let moreList = [];

    for (i = 0; i < this.state.symptoms.length; i += CLUSTER_SIZE) {
      moreList.push(<View key={i} style={styles.groupContainer}>{this.groupSymptoms(i, CLUSTER_SIZE)}</View>)
    }

    if (this.state.symptoms.length % CLUSTER_SIZE == 0) {
      moreList.push(
        <View key={this.state.symptoms.length}
          style={styles.groupContainer}>
          {this.groupSymptoms(this.state.symptoms.length, CLUSTER_SIZE)}
        </View>);
    }

    return moreList
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
          <View style={{ zIndex: 0, marginBottom: 30 }}>
            {this.renderMoreSymptoms()}
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