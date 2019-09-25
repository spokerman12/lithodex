import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default class AboutLithoDex extends Component {
	render (){
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	        	<Text>LithoDex v0.2</Text>
	        	<Text>Desarrollado por estudiantes y profesores {"\n"} de la Universidad Simón Bolívar {"\n"}</Text>
	        	<Text>Profesores asesores: {"\n"}Prof. Mireya Morales {"\n"}Prof. José Baena {"\n"}</Text>
	        	<Text>Desarrolladores:</Text>
	        	<Text>v0.1 Gabriel Gutiérrez</Text>
	        	<Text>v0.2 Daniel Francis</Text>
      		</View>
		);
	}
}