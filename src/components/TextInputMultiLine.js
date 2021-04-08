import React from 'react';
import { StyleSheet, Alert, View, AppRegistry, TextInput } from 'react-native';

export default class TextFieldMultiline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
        } 
     }

     deleteText(){
         this.setState({text: ""})
     }


     onNoteEdit = (newtext) =>{
        this.props.onTextChanged(newtext);
        this.setState({
            text: newtext
        })
    }

    colorStyle = {
        borderColor: this.props.color,
        borderWidth: StyleSheet.hairlineWidth,
    }

    render() {
        return (
        <View style = {this.props.color ? [styles.container, this.colorStyle] : [styles.container]}>
            <TextInput
                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                //onChangeText={(text) => {this.setState({text}); this.onNoteEdit; }}
                value={this.state.text}
                onChangeText={(text) => {this.onNoteEdit(text)}}
                style={styles.textInput}
                editable = {true}
                maxLength = {400}
                multiline = {true}
                placeholder={this.props.placeholderText || ""}
            />
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingLeft:5,
    },
    textInput: {
        height: "100%",
        paddingTop:5, 
        paddingBottom:5,color: 
        '#707070',
    },
});


/*
Example of calling this Component:

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = { text: 'random text'
      };
    }

    render() {
      return (
      <View style={{top:20}}>
        <View style = {style.Text}>
        <TextAreaInput
         preText = 'test'
         numberOfLines = {4}
         value={this.state.text}
         onChangeText={(text) => this.setState({text})}
        />
        </View>
       </View>

    );
  }
}*/

