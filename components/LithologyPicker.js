import React from 'react';
import { Text, Button, Image, View,
         TouchableHighlight, StyleSheet, Modal, ScrollView,
         FlatList } from 'react-native';

import { Avatar, ListItem } from "react-native-elements";
import { TriangleColorPicker, toHsv, fromHsv } from 'react-native-color-picker'

import { PATTERNS } from '../constants/patterns'

const sortedPatterns = PATTERNS.sort((a, b) => (a.name > b.name) ? 1 : -1)


export default class LithologyPicker extends React.Component {

  state = {
    image:null,
    label:null,
    pattern_image: null,
    pattern_id: null,
    pattern_name: null,
    color:toHsv('green'),
    modalVisible: false,

  }

  renderItems () {
    return sortedPatterns.map((item, i) => (
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
      pattern_image: item.uri, 
      pattern_id: item.key, 
      pattern_name: item.name,
      label:item.name
    })
  }

  cancelSelection = () => {
    this.setState({
      pattern_image: null,
      pattern_id: null,
      pattern_name: null,
      color:null,
    })
    this.setModalVisible(false)
  }

  acceptSelection = () => {
    this.setState({
      image:this.state.pattern_image
    })
    this.setModalVisible(false)
  }

  onColorChange = (color) => {
    this.setState({ color })
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
              <Text>Seleccione litología y el color</Text>
              <View style={styles.lithologyPicker}>
                <ScrollView>
                  {this.renderItems()}
                </ScrollView>
              </View>
              <View style={styles.lithologyPicker}>
                <TriangleColorPicker
                  color={this.state.color}
                  onColorChange={this.onColorChange}
                  style={{flex: 1}}
                />
              </View>
              <View style={styles.smallrow}>
                <Text>Litología: {this.state.label}</Text>
              </View>
              <View style={styles.smallrow}>
                <Text>Color: {fromHsv(this.state.color)}</Text>
              </View>
              <View style={styles.smallrow}>
                <Button title="Aceptar" onPress={this.acceptSelection}/>
                <Button title="Volver" color="#4f4f4f" onPress={this.cancelSelection}/>
              </View>
            </View>
          </Modal>

  	      <TouchableHighlight onPress={()=>{this.setModalVisible(true);}} style={{width:150, height: this.props.height}}>
  	        <View style={styles.row}>
  	          {!image && <Text>(Toque para cambiar la litología)</Text>}
  	          {image && 
                <View style={{backgroundColor:fromHsv(this.state.color)}}>
                  <Image source={image} 
                    style={{width:150, height: this.props.height, opacity: 0.5, borderColor: 'black', borderWidth: 1.5}}
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
  lithologyPicker: {
    flex: 2,
    flexDirection: 'column',
    padding:10
  },
  row: {
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