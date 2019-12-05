import React from 'react';
import { Text, Button, Image, View,
         TouchableHighlight, StyleSheet, Modal, ScrollView,
         FlatList, TextInput } from 'react-native';

import { Avatar, ListItem } from "react-native-elements";
import { TriangleColorPicker, toHsv, fromHsv, toRGB } from 'react-native-color-picker'

import { PATTERNS } from '../constants/patterns'

import * as Database from '../database/functions'

// AGREGAR BLANK EN TODOS LOS PICKER COMPONENTS
const sortedPatterns = PATTERNS.sort((a, b) => (a.name > b.name) ? 1 : -1)


export default class LithologyPicker extends React.Component {

  constructor(props){
    super(props)
    if (this.props.data){
      if (this.props.data.color) {
        this.state = {
          ...this.props.data,
          modalVisible: false,
          image: this.props.data.pattern_image,
        }
      } else {
        this.state = {
          ...this.props.data,
          modalVisible: false,
          image: this.props.data.pattern_image,
          color:toHsv('green'),
        }
      }
    } else {
      this.state = {
        image:null,
        label:null,
        pattern_image: null,
        pattern_id: null,
        pattern_name: null,
        color:toHsv('green'),
        modalVisible: false,
        filter_name:null,
      }  
    }
  }

  renderItems(filter_name) {

    if (filter_name == null){
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
    } else {
      return sortedPatterns.filter(item => item.name.toLowerCase().includes(filter_name.toLowerCase()))
        .map((item, i) => (
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
      image:this.state.pattern_image,
      modalVisible: false,
    })

    Database.saveComponentState(this.state, this.props.columnId, this.props.layerKey, this.props.componentKey)

    console.log(this.state)
    console.log([this.props.columnId, this.props.layerKey, this.props.componentKey])
    console.log('UPDATE THIS')
  }

  onColorChange = (color) => {
    this.setState({ color })
  }

  toCMYK = (hex) => {
    let red = parseInt(hex.substring(1,2),16)/255
    let green = parseInt(hex.substring(3,4),16)/255
    let blue = parseInt(hex.substring(5,6),16)/255
    let K = 1 - Math.max(red,green,blue)

    let C = parseInt((1-red-K)/(1-K)*100)
    let M = parseInt((1- green - K)/(1-K)*100)
    let Y = parseInt((1-blue-K)/(1-K)*100)

    return ("C: "+C.toString()+", M: "+M.toString()+", Y: "+Y.toString()+", K: "+parseInt(K*100).toString())
  }

  setFilter = (text) => {
    this.setState({filter_name:text})
  }


  render() {

    return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.search_row}>
                <Text>Seleccione litología y el color:   </Text>
                <TextInput style={styles.textInput} placeholder='Buscar...' onChangeText={text => this.setFilter(text)}/>
              </View>
              <View style={styles.lithologyPicker}>
                <ScrollView>
                  {this.renderItems(this.state.filter_name)}
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
                <Text>Color:  {this.toCMYK(fromHsv(this.state.color))}</Text>
              </View>
              <View style={styles.smallrow}>
                <Button title="Aceptar" onPress={this.acceptSelection}/>
                <Button title="Volver" color="#4f4f4f" onPress={this.cancelSelection}/>
              </View>
            </View>
          </Modal>

  	      <TouchableHighlight onPress={()=>{this.setModalVisible(true);}} style={{width:150, height: this.props.height}}>
  	        <View style={styles.row}>
  	          {!this.state.image && <Text>(Toque para cambiar la litología)</Text>}
  	          {this.state.image && 
                <View style={{backgroundColor:fromHsv(this.state.color)}}>
                  <Image source={this.state.image} 
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
    padding:10  
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
  search_row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
  },
  smallrow: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  textInput: {
    height: 35,
    borderWidth: 1,
    flex: 1,
  },
});