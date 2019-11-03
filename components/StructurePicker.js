import React from 'react';
import { Text, Button, Image, View,
         TouchableHighlight, StyleSheet, Modal, ScrollView,
         FlatList, Picker } from 'react-native';

import { Avatar, ListItem } from "react-native-elements";

import { STRUCTURES } from '../constants/structures'

const sortedStructures = STRUCTURES.sort((a, b) => (a.name > b.name) ? 1 : -1)


export default class StructurePicker extends React.Component {

  state = {
    image:null,
    label:null,
    structure_image: null,
    structure_id: null,
    structure_name: null,
    modalVisible: false,
    grainDiameter: 0,
    grainLabel: null,

  }

  renderItems () {
    return sortedStructures.map((item, i) => (
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
      structure_image: item.uri, 
      structure_id: item.key, 
      structure_name: item.name,
      label:item.name
    })
  }

  cancelSelection = () => {
    this.setState({
      structure_image: null,
      structure_id: null,
      structure_name: null,
    })
    this.setModalVisible(false)
  }

  acceptSelection = () => {
    this.setState({
      image:this.state.structure_image
    })
    this.setModalVisible(false)
  }

  setGrainDiameter = (value) => {
    this.setState({
      grainDiameter: 150,
      grainLabel: null,
    })
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
              <Text>Seleccione la estructura geológica y el diámetro del grano</Text>
              <View style={styles.structurePicker}>
                <ScrollView>
                  {this.renderItems()}
                </ScrollView>
              </View>
              <View style={styles.smallrow}>
                <Text>Diámetro del grano:</Text>
                <Picker
                  selectedValue={this.state.grainLabel}
                  style={{height: 130, width: 200}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({grainDiameter: itemValue})
                  }
                >
                  <Picker.Item label="Arcilla  ~0.004mm" value={1}/>
                  <Picker.Item label="Limo     ~0.008mm" value={2}/>
                  <Picker.Item label="Limo     ~0.016mm" value={3}/>
                  <Picker.Item label="Limo     ~0.031mm" value={4}/>
                  <Picker.Item label="Limo     ~0.062mm" value={5}/>
                  <Picker.Item label="Arena    ~0.125mm" value={6}/>
                  <Picker.Item label="Arena     ~0.25mm" value={7}/>
                  <Picker.Item label="Arena      ~0.5mm" value={8}/>
                  <Picker.Item label="Arena        ~1mm" value={9}/>
                  <Picker.Item label="Gránulos     ~2mm" value={10}/>
                  <Picker.Item label="Guijarros ~4-16mm" value={11}/>
                  <Picker.Item label="Guijarros   ~32mm" value={12}/>
                  <Picker.Item label="Guijarros   ~64mm" value={13}/>
                  <Picker.Item label="Guijarros  ~128mm" value={14}/>
                  <Picker.Item label="Rocas      ~256mm" value={15}/>
                </Picker>
              </View>
              <View style={styles.smallrow}>
                <Text>Estructura: {this.state.label}</Text>
              </View>
              <View style={styles.smallrow}>
                <Button title="Aceptar" onPress={this.acceptSelection}/>
                <Button title="Volver" color="#4f4f4f" onPress={this.cancelSelection}/>
              </View>
            </View>
          </Modal>

	      <TouchableHighlight onPress={()=>{this.setModalVisible(true);}} style={{width:225, height: this.props.height}}>
	        <View style={styles.leftrow}>
	          {!image && <Text>(Toque para cambiar la estructura del estrato)</Text>}
	          {image && 
              <View>
                <Image source={image} 
                  style={{width:150+5*this.state.grainDiameter, height: this.props.height, opacity: 1, borderColor: 'black', borderWidth: 1.5}}
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
  structurePicker: {
    flex: 2,
    flexDirection: 'column',
    padding:10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftrow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  smallrow: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
});