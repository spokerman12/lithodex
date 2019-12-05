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

import * as Database from '../database/functions'

import shortid from 'shortid'

export default class ColumnScreen extends Component {	

  constructor(props) {
    super(props)

    this.state = {
    	columnName : this.props.navigation.getParam('columnName'),
	  	columnId : this.props.navigation.getParam('columnId'),
	  	columnLocation: this.props.navigation.getParam('columnLocation'),
	  	longitude: this.props.navigation.getParam('longitude'),
	  	latitude: this.props.navigation.getParam('latitude'),
	  	scale: this.props.navigation.getParam('scale'),
	    lithology: this.props.navigation.getParam('lithology'),
	    structure: this.props.navigation.getParam('structure'),
	    image: this.props.navigation.getParam('image'),
	    fossil: this.props.navigation.getParam('fossil'),
	    note: this.props.navigation.getParam('note'),


	    layerList : this.props.navigation.getParam('layerList'),

	    modalVisible: false,

	    realHeight:0,
	    tempHeight:0,	
    }
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
  			lithology_data:{},
  			structure_data:{},
  			fossil_data:{},
  			image_data:{},
  			note_data:{},
  		})
  	}
  	this.saveLayerList(this.state.columnId, this.state.layerList)
  }

  removeLayer = () => {
  	let array = this.state.layerList
  	let removed = array.shift()
  	this.setState({layerList: array})
  }

  setRealHeight = (text) => {
  	this.setState({tempHeight: parseFloat(text)})
  	const mult = parseFloat(text)*this.state.scale
  	this.setState({realHeight: mult.toFixed(2)})
  }

  // esto solo deberia pasar en las hojas
  saveLayerList = (columnId,layerList) =>{
  	Database.saveLayerList(columnId, layerList)
  }

  renderItems () {
  	return this.state.layerList.map((item) => (
    	<View style={styles.container_row} key={item.key+'_row'}>
    		{this.state.lithology && 
    			<LithologyPicker ref={item.key+'_lithology'} height={item.height} columnId={this.state.columnId} componentKey={item.key+'_lithology'} key={item.key+'_lithology'} layerKey={item.key} data={item.lithology_data}/>}
    		{this.state.structure &&
    		 <StructurePicker ref={item.key+'_structure'} height={item.height} columnId={this.state.columnId} componentKey={item.key+'_structure'} key={item.key+'_structure'} layerKey={item.key} data={item.structure_data}/>}
    		{this.state.fossil &&
    		 <FossilPicker ref={item.key+'_fossil'} height={item.height} columnId={this.state.columnId} componentKey={item.key+'_fossil'} key={item.key+'_fossil'} layerKey={item.key} data={item.fossil_data}/>}
    		{this.state.image &&
    		 <ImagePicker ref={item.key+'_image'} height={item.height} columnId={this.state.columnId} componentKey={item.key+'_image'} key={item.key+'_image'} layerKey={item.key} data={item.image_data}/>}
    		{this.state.note &&
    		 <NotePicker ref={item.key+'_note'} height={item.height} columnId={this.state.columnId} componentKey={item.key+'_note'} key={item.key+'_note'} layerKey={item.key} data={item.note_data}/>}
			</View>
    ))
  }

	render (){
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