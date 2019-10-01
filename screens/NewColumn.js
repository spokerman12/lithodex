import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import ImagePicker from '../components/ImagePicker'

export default class NewColumn extends Component {
	render (){
		return (
			// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			
			<ScrollView horizontal>
				<ScrollView>
					<Text>asdsadasdasdasdasdasdasdasdggfgfasdsadasdasdasdasdasdasdasdggfgfasdsadasdasdasdasdasdasdasdggfgfasdsadasdasdasdasdasdasdasdggfgfasdsadasdasdasdasdasdasdasdggfgfasdsadasdasdasdasdasdasdasdggfgfasdsadasdasdasdasdasdasdasdggfgf</Text>
					<ImagePicker/>
			    </ScrollView>
			</ScrollView>
      		// </View>
		);
	}
}