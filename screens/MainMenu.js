import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight,
		 Platform,} from 'react-native';
import { Constants } from 'expo';

export default class MainMenu extends Component {

	render (){

		console.log('Running on...')
		console.log(Platform.OS)
		console.log(Platform.Version)

		if ((Platform.Version <= 14) && Platform.OS=='android') {
			return(
				<View style={styles.menu}>
					<Text>Lamentablemente, LithoDex solo funciona correctamente en versiones de Android 4.1 o mayor</Text>
				</View>
			)
		}

		return(
			<View style={styles.menu}>
				<Image 
					style={{width: 100, height: 100, marginTop:40}}
					source={require('../assets/icon.png')}
				/>
				<View style={styles.row}>
					<TouchableHighlight 
						onPress={() => this.props.navigation.push('NewColumn')}
						underlayColor= '#cccc'
						style={styles.menu_item}>
							<View>
								<Image 
									style={{width: 100, height: 100}}
									source={require('../assets/new_column_icon.png')}
								/>
								<Text style={styles.menu_item_text}>
									Nueva{"\n"}columna
								</Text>
							</View>
					</TouchableHighlight>

					<TouchableHighlight 
						onPress={() => this.props.navigation.push('ColumnGallery')}
						underlayColor= '#cccc'
						style={styles.menu_item}>
							<View>
								<Image 
									style={{width: 100, height: 100}}
									source={require('../assets/new_column_icon.png')}
								/>
								<Text style={styles.menu_item_text}>
									Galería{"\n"}de columnas
								</Text>
							</View>
					</TouchableHighlight>
				</View>

				<View style={styles.row}>
					<TouchableHighlight 
						onPress={() => this.props.navigation.push('NewCore')}
						underlayColor= '#cccc'
						style={styles.menu_item}>
							<View>
								<Image 
									style={{width: 100, height: 100}}
									source={require('../assets/new_column_icon.png')}
								/>
								<Text style={styles.menu_item_text}>
									Nuevo{"\n"}núcleo
								</Text>
							</View>
					</TouchableHighlight>
					
					<TouchableHighlight 
						onPress={() => this.props.navigation.push('CoreGallery')}
						underlayColor= '#cccc'
						style={styles.menu_item}>
							<View>
								<Image 
									style={{width: 100, height: 100}}
									source={require('../assets/new_column_icon.png')}
								/>
								<Text style={styles.menu_item_text}>
									Galería{"\n"}de núcleos
								</Text>
							</View>
					</TouchableHighlight>
				</View>

				<View style={styles.row}>
					<TouchableHighlight 
						onPress={() => this.props.navigation.push('Settings')}
						underlayColor= '#cccc'
						style={styles.menu_item}>
						<Text style={styles.menu_item_text}>
							Configuración
						</Text>
					</TouchableHighlight>
					
					<TouchableHighlight 
						onPress={() => this.props.navigation.push('AboutLithoDex')}
						underlayColor= '#cccc'
						style={styles.menu_item}>
						<Text style={styles.menu_item_text}>
							Sobre LithoDex
						</Text>
					</TouchableHighlight>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
  title_text:{
  	fontSize: 46,
  	marginRight:40,
    marginLeft:40,
    marginTop:40,
    paddingTop:5,
    paddingBottom:5,
  },

  menu: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingTop:20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu_item: {
    backgroundColor: '#f2f2f2',
    borderRadius:10,
    marginRight:40,
    marginLeft:40,
    paddingTop:5,
    paddingBottom:5,
    width:101,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  menu_item_text: {
  	fontSize: 16,
  	textAlign: 'center',
  	fontWeight: 'bold',
  },
});
