import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, } from 'react-native';
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
		}
		this.getColumns = this.getColumns.bind(this)
		this.setState = this.setState.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
	}


	async loadColumns () {
		const current_user_id = 'admin'
		const db = new PouchDB('lithodex')
		db.get('default')
			.then( database => {
				const current_user = database.users.find(element => element._id === current_user_id);
				console.log(database.users)
				if (current_user){
					this.setState({
						loading:false,
						columnList: current_user.columns,
						renderList: current_user.columns.map((item, index) => (
							<ListItem
				        key={index}
				        title={item.columnName + ' hola'}
				        subtitle={item.columnLocation+ ' Subtitulo'}
				        avatar={{uri:''}}
				        bottomDivider
				        chevron
				      />
				    ))
					})
				}
			})
	}

	editColumn = (payload) => {  	
	  	// this.props.navigation.push('ColumnScreen', payload)
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
		if (this.state.loading === true){
			return (
				<View style={{ flex: 1, alignItems: 'center',justifyContent: 'flex-start'}}>
				<NavigationEvents onDidFocus={payload => this.loadColumns()}/>
	      	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
						<ActivityIndicator size="small" color="#0000ff" />
						<Text>Cargando...</Text>
	      	</View>
	      </View>
		  );	
		} else {
			return (
				<View style={{ flex: 1, alignItems: 'center',justifyContent: 'flex-start'}}>
				<NavigationEvents onDidFocus={payload => this.loadColumns()}/>
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

