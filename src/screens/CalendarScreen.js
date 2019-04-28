import React from 'react';
//import { ExpoConfigView } from '@expo/samples';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Constants, SQLite } from 'expo';
import SymptomCalendarPicker from "../components/CalendarPicker";  
import EntryList from "../components/EntryList"

const db = SQLite.openDatabase('app.db');

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  state = {
    text: null
  };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text);'
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
	  <View style={styles.calenderArea}>
		<SymptomCalendarPicker/>
		</View>
		<View style={styles.listArea}>
		<EntryList />
		</View>
      </View>
    );
  }

  add(text) {
    // is text empty?
    if (text === null || text === '') {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
        tx.executeSql('select * from items', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.update
    );
  }

  update = () => {
    this.todo && this.todo.update();
    this.done && this.done.update();
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
	alignItems:'stretch',
	justifyContent:'flex-start',
	flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  flexRow: {
    flexDirection: 'row'
  },
  input: {
    borderColor: '#4630eb',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: 'white',
    flex: 2,
    paddingTop: 10,
	
  },
  calenderArea: {
    backgroundColor: 'white',
    flex: 3,
	
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  },
});

class Items extends React.Component {
  state = {
    items: null
  };

  componentDidMount() {
    this.update();
  }

  render() {
    const { done: doneHeading } = this.props;
    const { items } = this.state;
    const heading = doneHeading ? 'Completed' : 'Todo';

    if (items === null || items.length === 0) {
      return null;
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>{heading}</Text>
        {items.map(({ id, done, value }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={{
              backgroundColor: done ? '#1c9963' : '#fff',
              borderColor: '#000',
              borderWidth: 1,
              padding: 8
            }}>
            <Text style={{ color: done ? '#fff' : '#000' }}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}