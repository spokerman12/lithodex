import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Modal, } from 'react-native';
import { ListItem, Button } from 'react-native-elements'

import { NavigationEvents } from 'react-navigation'

import * as Log from '../log/functions'
import * as Database from '../database/functions'

import PouchDB from 'pouchdb-react-native'

export default class ColumnGallery extends Component {

	constructor(props) {
		super(props)
		this.state = {
			loading:true,
			columnList: [],
			renderList: [],
			modalVisible:false,
			selectedColumn:null,
		}
		this.getColumns = this.getColumns.bind(this)
	}


	async loadColumns () {
		const current_user_id = 'admin'
		const db = new PouchDB('lithodex')
		db.get('default')
			.then( database => {
				const current_user = database.users.find(element => element._id === current_user_id);
				if (current_user){
					this.setState({
						loading:false,
						columnList: current_user.columns,
						renderList: current_user.columns.map((item, index) => (
							<ListItem
				        key={index}
				        title={item.columnName}
				        subtitle={item.columnLocation}
				        avatar={{uri:''}}
				        bottomDivider
				        chevron
				        onPress={() => {this.editColumn(item)}}
				        onLongPress={() => this.showModal(item)}
				      />
				    ))
					})
				}
			})
	}

	editColumn(column) {  	
	  this.props.navigation.push('ColumnScreen', column)
  }

  showModal(column) {  	
	  this.setState({
	  	'selectedColumn': column,
	  	'modalVisible':true,
	  })
  }

  closeModal = () => {
  	this.setState({
  		'modalVisible':false,
  	})
  }

  editColumnInfo(column) {  	
  	this.setState({
  		'modalVisible':false,
  	})
  	column.wasCreated = true
	  this.props.navigation.push('NewColumn', column)
  }
  
  newColumn = () => {  	
	  this.props.navigation.push('NewColumn')
  }

	getColumns = async () => {
		const current_user_id = 'admin'
		const db = new PouchDB('lithodex')
		db.get('default', function (error, database){
			if (error) {
				console.log(error)
				return null
			} else {
				const current_user = database.users.find(element => element._id === current_user_id);
				return current_user.columns
			}
		})
	}


	render (){
		if (this.state.loading){
			return (
				<View style={{ flex: 1, alignItems: 'center',justifyContent: 'flex-start'}}>
				<NavigationEvents onWillFocus={payload => this.loadColumns()}/>
	      	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
						<ActivityIndicator size="small" color="#0000ff" />
						<Text>Cargando...</Text>
	      	</View>
	      </View>
		  );	
		} else {
			return (
				<View style={{ flex: 1, alignItems: 'center',justifyContent: 'flex-start'}}>
				<NavigationEvents onWillFocus={payload => this.loadColumns()}/>
				<NavigationEvents onDidFocus={payload => this.loadColumns()}/>
					<Modal
	            animationType="slide"
	            transparent={false}
	            visible={this.state.modalVisible}
	            onRequestClose={this.closeModal}>
	            <View style={{ flex: 1}}>
		            <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
			            <View style={{alignItems: 'center',justifyContent: 'center', padding: 30}}>
				            <Button
											raised
										  icon={{name: 'create'}}
										  title='Modificar información de columna' 
										  onPress={() => {this.editColumnInfo(this.state.selectedColumn)}}
										/>
									</View>
									<View style={{alignItems: 'center',justifyContent: 'center', padding: 30}}>
										<Button
											raised
										  icon={{name: 'clear'}}
										  title='Eliminar columna' 
										  onPress={this.closeModal}
										/>
									</View>
								</View>
								<View style={{flex: 0.2, alignItems: 'center',justifyContent: 'center', padding: 30}}>
				            <Button
											raised
										  icon={{name: 'undo'}}
										  title='Volver' 
										  onPress={this.closeModal}
										/>
								</View>
							</View>
	        </Modal>


	      	<View style={{ flex: 0.9, justifyContent: 'flex-start', flexDirection: 'row'}}>
						<ScrollView>
							{this.state.renderList}
						</ScrollView>      	
	      	</View>
	      	<View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
						<Button
							raised
						  icon={{name: 'playlist-add'}}
						  title='Nueva columna' 
						  onPress={this.newColumn}
						/>
	      	</View>
	      </View>
			);
		}
	}
}

