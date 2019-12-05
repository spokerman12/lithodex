import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import * as Database from '../database/functions'

export default class Settings extends Component {
	
	constructor(props){
		super(props)
	}

	deleteDatabase() {
		new PouchDB('lithodex').destroy().then(function () {
	      Database.dummy_database()
	    }).catch(function (error) {
	      console.log(error)
	    })
	}

	render (){
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	        	<Button 
	        		title='Borrar dase de datos'
	        		onPress={this.deleteDatabase}
	        	/>
      		</View>
		);
	}
}