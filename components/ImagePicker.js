import React from 'react';
import { Text, Button, Image, View,
         TouchableHighlight, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    modalVisible: false,
  }

  setModalVisible (isVisible) {
    this.setState({modalVisible: isVisible});
  }


  selectPicture = async () => {
    // iOS
    // await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({ aspect: [1,1], allowsEditing: true});
    if(!cancelled) {
      this.setState({ image: uri, modalVisible: false });
    }
  
  }

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({ allowsEditing: true});
    if(!cancelled || uri) {
      this.setState({ image: uri, modalVisible: false});
    }
  }

  render() {

    let { image } = this.state;

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

      <TouchableHighlight onPress={()=>{this.setModalVisible(true);}} style={{width:150, height: 150}}>
        <View style={styles.modal}>
          {!image && <Text>(Toque para añadir una foto)</Text>}
          {image && <Image source={{ uri: image }} style={{width:150, height: 150}}/>}
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
