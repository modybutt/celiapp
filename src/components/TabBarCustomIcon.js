import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export default class TabBarCustomIcon extends React.Component {
	render() {
	  return (		
		<Image
			source={this.props.source}
			size={26}
			style={{ marginBottom: -3 }}
			tintColor={this.props.focused ? Colors.mainscreenPrimaryColor : Colors.tabIconDefault}
		/>
	  );
	}
  }