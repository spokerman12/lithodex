import React from 'react';
import { Text, Button, Image, View,
         TouchableHighlight, StyleSheet, Modal, ScrollView,
         FlatList } from 'react-native';

import { Avatar, ListItem } from "react-native-elements";

import { FOSSILS } from '../constants/fossils'

const sortedFossils = FOSSILS.sort((a, b) => (a.name > b.name) ? 1 : -1)


export default class Fossilicker extends React.Component {

  state = {
    image:null,
    label:null,
    fossil_image: null,
    fossil_id: null,
    fossil_name: null,
    modalVisible: false,

  }

  renderItems () {
    return sortedFossils.map((item, i) => (
      <TouchableHighlight 
        onPress={() =>{this.itemSelection(item)}}
        key={item.name.concat('TouchableHighlight')}
      >
        <ListItem
          title={item.name}
          leftAvatar={<Avatar
                        size="large"
                        source={item.uri}
                      />}
          key={item.name.concat('ListItem')}
        />
      </TouchableHighlight>
    ))
  }

  setModalVisible (isVisible) {
    this.setState({modalVisible: isVisible});
  }

  itemSelection (item) {
    this.setState({
      fossil_image: item.uri, 
      fossil_id: item.key, 
      fossil_name: item.name,
      label:item.name
    })
  }

  cancelSelection = () => {
    this.setState({
      fossil_image: null,
      fossil_id: null,
      fossil_name: null,
    })
    this.setModalVisible(false)
  }

  acceptSelection = () => {
    this.setState({
      image:this.state.fossil_image
    })
    this.setModalVisible(false)
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
            <View style={styles.modalContainer}>
              <Text>Seleccione un fósil</Text>
              <View style={styles.fossilPicker}>
                <ScrollView>
                  {this.renderItems()}
                </ScrollView>
              </View>
              <View style={styles.smallrow}>
                <Text>Tipo de fósil: {this.state.label}</Text>
              </View>
              <View style={styles.smallrow}>
                <Button title="Aceptar" onPress={this.acceptSelection}/>
                <Button title="Volver" color="#4f4f4f" onPress={this.cancelSelection}/>
              </View>
            </View>
          </Modal>

	      <TouchableHighlight onPress={()=>{this.setModalVisible(true);}} style={{width:150, height: this.props.height}}>
	        <View style={styles.row}>
	          {!image && <Text>(Toque para cambiar el tipo de fósil)</Text>}
	          {image && 
              <View>
                <Image source={image} 
                  style={{width:50, height: 50, opacity: 1}}
                />
              </View>
            } 
	        </View>
	      </TouchableHighlight>
      	</View>
      );
    }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',    
  },
  fossilPicker: {
    flex: 2,
    flexDirection: 'column',
    padding:10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
  },
  smallrow: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
});