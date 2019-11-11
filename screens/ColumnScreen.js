import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button,
				Picker, Modal, ScrollView } from 'react-native';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import PickerCheckBox from 'react-native-picker-checkbox'

import ImagePicker from '../components/ImagePicker'
import LithologyPicker from '../components/LithologyPicker'
import NotePicker from '../components/NotePicker'
import FossilPicker from '../components/FossilPicker'
import StructurePicker from '../components/StructurePicker'

import shortid from 'shortid'

export default class ColumnScreen extends Component {	

  constructor(props) {
    super(props)
  }

  state = {
  	columnName : this.props.navigation.getParam('columnName'),
  	columnLocation: this.props.navigation.getParam('columnLocation'),
  	longitude: this.props.navigation.getParam('longitude'),
  	latitude: this.props.navigation.getParam('latitude'),
  	scale: this.props.navigation.getParam('scale'),
    lithology: this.props.navigation.getParam('lithology'),
    structure: this.props.navigation.getParam('structure'),
    image: this.props.navigation.getParam('image'),
    fossil: this.props.navigation.getParam('fossil'),
    note: this.props.navigation.getParam('note'),


    layerList : [],

    modalVisible: false,

    realHeight:0,
    tempHeight:0,
  }

  setModalVisible(visible){
  	this.setState({modalVisible: visible})
  }

  addLayer = () => {
  	if (this.state.tempHeight >= 1 && this.state.tempHeight <= 10){
  		this.setModalVisible(false)
	  	this.state.layerList.unshift({
  			height: 50*this.state.tempHeight,
  			key: shortid.generate(),
  		})
  	}
  	console.log(this.state.layerList)
  }

  removeLayer = () => {
  	let array = this.state.layerList
  	let removed = array.shift()
  	this.setState({layerList: array})
  }

  setRealHeight = (text) => {
  	this.setState({tempHeight: parseInt(text)})
  	const mult = parseInt(text)*this.state.scale
  	this.setState({realHeight: mult.toFixed(2)})
  }

  renderItems () {
  	console.log(this.state.layerList)
    return this.state.layerList.map((item) => (
    	<View style={styles.container_row} key={item.key+'_row'}>
    		{this.state.lithology && <LithologyPicker height={item.height} key={item.key+'_lithology'}/>}
    		{this.state.structure && <StructurePicker height={item.height} key={item.key+'_structure'}/>}
    		{this.state.fossil && <FossilPicker height={item.height} key={item.key+'_fossil'}/>}
    		{this.state.image && <ImagePicker height={item.height} key={item.key+'_image'}/>}
    		{this.state.note && <NotePicker height={item.height} key={item.key+'_note'}/>}
			</View>
    ))
  }

	render (){
		console.log(this.state)
		return (
			<View style={{flexDirection:'column', paddingTop:20}}>
				
				<Modal
					animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
				>
					<View style={styles.modal}>
						<View style={{padding:10, width:200}}>
							<Text>Escoja la altura del estrato (en escala 1:{this.state.scale}m):</Text>
	          </View>
	          <View style={{width:200, height:35}}>
							<TextInput style={styles.textInput} 
							keyboardType='number-pad'
							onChangeText={text => this.setRealHeight(text)}/>
	          </View>
	          <View style={{padding:10, width:200}}>
	          	<Text>...equivale a {this.state.realHeight} metros</Text>
	          	<Text>(Solo valores entre 1 y 10)</Text>
	          </View>
	          <View style={{padding:10, width:200}}>
							<Button title="OK" onPress={this.addLayer}/>
						</View>
					</View>
				</Modal>

					<View style={styles.first_header}>
						<View style={styles.first_header_text}>
							<Text>{this.state.columnName} Escala: {this.state.scale}m</Text>
						</View>
						<View style={{flex:0.5, padding:10, width:90}}>
							<Button title="+" onPress={() => this.setModalVisible(true)}/>
						</View>
						<View style={{flex:0.5, padding:10, width:90}}>
							<Button title="-" onPress={this.removeLayer} color='red'/>
						</View>
					</View>

				<View style={styles.container}>
					<ScrollView horizontal>
						<View style={styles.conainer_column}>
							<View style={styles.second_header}>
								{this.state.lithology && 
									<View style={styles.lithology_section}>
										<Text>Litología</Text>
									</View>
								}
								{this.state.structure && 
									<View style={styles.structure_section}>
										<Text>Estructura</Text>
									</View>
								}
								{this.state.fossil && 
									<View style={styles.fossil_section}>
										<Text>Fósiles</Text>
									</View>
								}
								{this.state.image && 
									<View style={styles.image_section}>
										<Text>Fotografía</Text>
									</View>
								}
								{this.state.note && 
									<View style={styles.note_section}>
										<Text>Anotaciones</Text>
									</View>
								}
							</View>
							<ScrollView style={{paddingTop:10}}>
								<View style={styles.conainer_column}>
									{this.renderItems()}
								</View>
							</ScrollView>
						</View>
					</ScrollView>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding:30,
  },
  first_header_text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding:30,
  },
  column: {
    flex: 1,
    flexDirection: 'column',    
  },
  first_header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  second_header: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    height: 30,
  },
  lithology_section : {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 150,
  },
  structure_section : {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 150+5*15,
  },
  fossil_section : {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 150,
  },
  image_section : {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 150,
  },
  note_section : {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 150,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    paddingTop:30,
    paddingBottom:45,
  },
  textInput: {
  	height: 35,
  	width: 200,
  	borderWidth: 1,
  	flex: 1,
  },
  container: {
    flexDirection: 'column',  
    padding:20  
  },
  container_column: {
    flex: 1,
    flexDirection: 'column',
    opacity:1,
  },
  container_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});