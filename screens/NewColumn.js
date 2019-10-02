import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import ImagePicker from '../components/ImagePicker'

export default class NewColumn extends Component {
	render (){
		return (
			// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			// Remember FlatLists si se pone pesado
			<ScrollView horizontal>
				<Text>---------------------------------------------------------------------------------------</Text>
				<ScrollView>
					<ImagePicker/>
			    </ScrollView>
			</ScrollView>
      		// </View>
		);
	}
}