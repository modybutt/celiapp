import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LanguageManager from '../../manager/LanguageManager';
import BackgroundButton from './BackgroundButton';


export default class FoodDiaryTagEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          selected: props.selected,
        }
      }

    render() {
        return (
          <View style={styles.container}>
            {this.makeButtons()}
          </View>
        )
      }

    changeTag = (key) => {
        let selected
          selected = key        
        this.setState({
          selected,
        });

        if (this.props.onTagChanged != null) {
            this.props.onTagChanged(key);
        }
      }

    makeButtons() {
        return this.props.all.map((tag, i) => {
          const on = (this.state.selected == i)
          const backgroundColor = on ? '#1e90ff' : '#a9a9a9'
          const textColor = on ? '#f8f8ff' : '#000000'
          const borderColor = on ? '#696969' : '#1e90ff'
    return (
            <BackgroundButton
              backgroundColor={backgroundColor}
              textColor={textColor}
              borderColor={borderColor}
              onPress={() => {
                this.changeTag(i)
              }}              
              key={i}
              showImage={on}
              title={tag} />
          )
        })
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20
      }
    })