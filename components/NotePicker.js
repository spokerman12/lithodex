import React from 'react';
import { Text, Button, TextInput, View,
         TouchableHighlight, StyleSheet, Modal } from 'react-native';


export default class NotePicker extends React.Component {

  render() {

    return (
        <View>
          <TextInput
		      style={{ height: this.props.height, width: 150, borderColor: 'gray', borderWidth: 1 }}
		      multiline={true}
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
