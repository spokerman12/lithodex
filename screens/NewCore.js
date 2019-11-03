import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView,
		Button } from 'react-native';

import ImagePicker from '../components/ImagePicker'
import LithologyPicker from '../components/LithologyPicker'
import NotePicker from '../components/NotePicker'
import FossilPicker from '../components/FossilPicker'
import StructurePicker from '../components/StructurePicker'

export default class NewCore extends Component {
	render (){
		return (
			// Remember FlatLists si se pone pesado
			// poner un modal donde escoga las entradas
			// para Column Creator
			<View style={styles.container}>

				<ScrollView horizontal>
					<View style={styles.column}>
						<ScrollView style={{paddingTop:40}}>
							<Text>Titulos 2</Text>
							<View style={styles.column}>
								<View style={styles.row}>
									<LithologyPicker/>
									<StructurePicker/>
									<FossilPicker/>
									<ImagePicker/>
									<NotePicker/>
								</View>
							    <View style={styles.row}>
									<LithologyPicker/>
									<StructurePicker/>
									<FossilPicker/>
									<ImagePicker/>
									<NotePicker/>
								</View>
								<View style={styles.row}>
									<LithologyPicker/>
									<StructurePicker/>
									<FossilPicker/>
									<ImagePicker/>
									<NotePicker/>
								</View>
								<View style={styles.row}>
									<LithologyPicker/>
									<StructurePicker/>
									<FossilPicker/>
									<ImagePicker/>
									<NotePicker/>
								</View>
								<View style={styles.row}>
									<LithologyPicker/>
									<StructurePicker/>
									<FossilPicker/>
									<ImagePicker/>
									<NotePicker/>
								</View>
								<View style={styles.row}>
									<LithologyPicker/>
									<StructurePicker/>
									<FossilPicker/>
									<ImagePicker/>
									<NotePicker/>
								</View>
								<View style={styles.row}>
									<LithologyPicker/>
									<StructurePicker/>
									<FossilPicker/>
									<ImagePicker/>
									<NotePicker/>
								</View>
							</View>
						</ScrollView>
					</View>
			    </ScrollView>
			</View>
		);
	}
}
// export default class NewColumn extends Component {
// 	render (){
// 		return (
// 			// Remember FlatLists si se pone pesado
// 			// poner un modal donde escoga las entradas
// 			// para Column Creator
// 			<View style={styles.container}>

// 				<ScrollView horizontal>
// 					<View style={styles.column}>
// 						<ScrollView style={{paddingTop:40}}>
// 							<Text>Titulos 2</Text>
// 							<View style={styles.column}>
// 								<View style={styles.row}>
// 									<LithologyPicker/>
// 									<StructurePicker/>
// 									<FossilPicker/>
// 									<ImagePicker/>
// 									<NotePicker/>
// 								</View>
// 							    <View style={styles.row}>
// 									<LithologyPicker/>
// 									<StructurePicker/>
// 									<FossilPicker/>
// 									<ImagePicker/>
// 									<NotePicker/>
// 								</View>
// 								<View style={styles.row}>
// 									<LithologyPicker/>
// 									<StructurePicker/>
// 									<FossilPicker/>
// 									<ImagePicker/>
// 									<NotePicker/>
// 								</View>
// 								<View style={styles.row}>
// 									<LithologyPicker/>
// 									<StructurePicker/>
// 									<FossilPicker/>
// 									<ImagePicker/>
// 									<NotePicker/>
// 								</View>
// 								<View style={styles.row}>
// 									<LithologyPicker/>
// 									<StructurePicker/>
// 									<FossilPicker/>
// 									<ImagePicker/>
// 									<NotePicker/>
// 								</View>
// 								<View style={styles.row}>
// 									<LithologyPicker/>
// 									<StructurePicker/>
// 									<FossilPicker/>
// 									<ImagePicker/>
// 									<NotePicker/>
// 								</View>
// 								<View style={styles.row}>
// 									<LithologyPicker/>
// 									<StructurePicker/>
// 									<FossilPicker/>
// 									<ImagePicker/>
// 									<NotePicker/>
// 								</View>
// 							</View>
// 						</ScrollView>
// 					</View>
// 			    </ScrollView>
// 			</View>
// 		);
// 	}
// }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',  
    padding:20  
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',    
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  header_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:15,
    backgroundColor: 'red',
    opacity:1,
  },
  smallrow: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    opacity:1,
  },
});