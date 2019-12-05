import React from 'react';
import { Text, Button, Image, View,
         TouchableHighlight, StyleSheet, Modal } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as Database from '../database/functions'

export default class ImagePicker extends React.Component {

  constructor(props){
    super(props)
    if (this.props.data){
      this.state = {
        image: this.props.data.image,
        modalVisible: false,
      }
    } else {
      this.state = {
        image: null,
        modalVisible: false,
      }
    }
  }


  setModalVisible (isVisible) {
    this.setState({modalVisible: isVisible});
  }

  selectPicture = async () => {
    // iOS
    // await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ExpoImagePicker.launchImageLibraryAsync({ aspect: [1,this.props.height/150], allowsEditing: true});
    if(!cancelled) {
      this.setState({ image: uri, modalVisible: false });

      Database.saveComponentState({...this.state, image:uri, modalVisible:false}, this.props.columnId, this.props.layerKey, this.props.componentKey)

      console.log(this.state)
      console.log([this.props.columnId, this.props.layerKey, this.props.componentKey])
      console.log('UPDATE THIS')
    } else {
      this.setState({modalVisible: false });
      console.log('error')
    }
  
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    console.log('Camera?')
    const { cancelled, uri } = await ExpoImagePicker.launchCameraAsync({ allowsEditing: true});
    if(!cancelled || uri) {
      this.setState({ image: uri, modalVisible: false});

      Database.saveComponentState(this.state, this.props.columnId, this.props.layerKey, this.props.componentKey)

      console.log(this.state)
      console.log([this.props.columnId, this.props.layerKey, this.props.componentKey])
      console.log('UPDATE THIS')
    }
  }

  render() {

    return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.closeModal}>
            <View style={styles.modal}>
              <View style={{padding:10, width:175}}>
                <Button title="Buscar en galería" onPress={this.selectPicture}/>
              </View>
              <View style={{padding:10, width:175}}>
                <Button title="Capturar en cámara" onPress={this.takePicture}/>
              </View>
              <View style={{padding:10, width:175}}>
                <Button title="Volver" color="#4f4f4f" onPress={()=>{this.setModalVisible(false);}}/>
              </View>
            </View>
          </Modal>

      <TouchableHighlight onPress={()=>{this.setModalVisible(true);}} style={{width:150, height: this.props.height}}>
        <View style={styles.modal}>
          {!this.state.image && <Text>(Toque para añadir una foto)</Text>}
          {this.state.image && <Image source={{ uri: this.state.image }} style={{width:150, height: this.props.height, borderColor: 'black', borderWidth: 1.5}}/>}
        </View>
      </TouchableHighlight>
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
