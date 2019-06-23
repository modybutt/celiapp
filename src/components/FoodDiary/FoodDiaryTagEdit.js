import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LanguageManager from '../../manager/LanguageManager';
import BackgroundButton from './BackgroundButton';


export default class FoodDiaryTagEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          selected: props.selected
        }
      }

    render() {
        return (
          <View style={styles.container}>
            {this.makeButtons()}
          </View>
        )
      }

    changeTag = (tag) => {
        let selected
        if (this.props.isExclusive) {
          selected = [tag]
        } else {
            array = this.state.selected
            const exists = array.includes(tag)
            if (exists) {
                selected =  array.filter((c) => { selected = c !== tag })
            } else {
                const result = array
                result.push(tag)
                selected =  result
            }
        }

        this.setState({
          selected
        });

        if (this.props.onTagChanged != null) {
            this.props.onTagChanged(tag);
        }
      }

    makeButtons() {
        return this.props.all.map((tag, i) => {
          const on = this.state.selected.includes(tag)
          const backgroundColor = on ? '#1e90ff' : '#a9a9a9'
          const textColor = on ? '#f8f8ff' : '#000000'
          const borderColor = on ? '#696969' : '#1e90ff'
    return (
            <BackgroundButton
              backgroundColor={backgroundColor}
              textColor={textColor}
              borderColor={borderColor}
              onPress={() => {
                this.changeTag(tag)
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