import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import ImagePicker from '../components/ImagePicker'
import LithologyPicker from '../components/LithologyPicker'

export default class NewColumn extends Component {
	render (){
		return (
			// Remember FlatLists si se pone pesado
			<ScrollView>
				<ScrollView horizontal>
					<LithologyPicker/>
					<ImagePicker/>
			    </ScrollView>
			</ScrollView>
      		// </View>
		);
	}
}