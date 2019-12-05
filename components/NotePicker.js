import React from 'react';
import { Text, Button, TextInput, View,
         TouchableHighlight, StyleSheet, Modal } from 'react-native';

import * as Database from '../database/functions'

export default class NotePicker extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    if (this.props.data){
      this.state = {
        text: this.props.data.text
      }
    } else {
      this.state = {
       text: 'Presione Enter para guardar la nota'
      }
    }
  }

  acceptText (text) {
    this.setState({
      text:text,
    })
    Database.saveComponentState({text:text}, this.props.columnId, this.props.layerKey, this.props.componentKey)
  }

  render() {

    return (
        <View>
          <TextInput
  		      style={{ height: this.props.height, width: 150, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.acceptText(text)}
  		      multiline={true}
            selectTextOnFocus={true}
            defaultValue={this.state.text}
		      />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
