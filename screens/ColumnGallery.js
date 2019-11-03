import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default class ColumnGallery extends Component {
	render (){
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	        	<Text>Elem0</Text>
	        	<FlatList 
	        		style={{flex:7}}
	        		data={DATA}
	        		renderItem={({ item }) => <Text>{item.title}</Text>}
	        		keyExtractor={item => item.id}
	        	/>
	        	<Text>Galería dada</Text>
	        	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
	        	<Button title="Nueva columna"/>
	        	<Text>Galería de columnas</Text>
	        	</View>
	        	
      		</View>
		);
	}
}