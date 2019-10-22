import React from 'react'
import { View, UIManager, findNodeHandle, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

import * as Icon from '@expo/vector-icons';
import Colors from '../constants/Colors';

const ICON_SIZE = 24

export default class PopupMenu extends React.Component {
  // static propTypes = {
  //   // array of strings, will be list items of Menu
  //   actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
  //   onPress: PropTypes.func.isRequired
  // }

  constructor (props) {
    super(props)
    this.state = {
      icon: null
    }
  }

  onError() {
    console.log('Popup Error')
  }

  onPress() {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      )
    }
  }

  render () {
    return (
      <View style={this.props.style}>
        <TouchableOpacity style={styles.actionArea} onPress={() => this.onPress()}>
          <Icon.Ionicons
            name='md-more'
            size={ICON_SIZE}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            ref={(icon) => this.onRef(icon)} />
        </TouchableOpacity>
      </View>
    )
  }

  onRef(icon) {
    if (!this.state.icon) {
      this.setState({icon})
    }
  }
}

const styles = StyleSheet.create({
  actionArea: {
    width: ICON_SIZE + 5,
    height: ICON_SIZE + 5,
    backgroundColor: Colors.tabBar,
    alignItems: 'center',
    borderColor: Colors.tabIconDefault,
    borderRadius: 15,
    borderWidth: 1,
  },
});