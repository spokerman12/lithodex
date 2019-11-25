import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default class AboutLithoDex extends Component {
	render (){
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	        	<Text>LithoDex v2</Text>
	        	<Text>Desarrollado por estudiantes y profesores {"\n"} de la Universidad Simón Bolívar{"\n"}</Text>
	        	<Text>Profesores asesores: {"\n"}Prof. Mireya Morales {"\n"}Prof. José Baena {"\n"}</Text>
	        	<Text>Desarrolladores:</Text>
	        	<Text>v1 Gabriel Gutiérrez</Text>
	        	<Text>v2 Daniel Francis</Text>
	        	<Text>Colaboradores: {"\n"}Prof. Masun Nabhan Homsi {"\n"}Prof. Miguel Torrealba {"\n"}</Text>
      		</View>
		);
	}
}