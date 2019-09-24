import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default class MainMenu extends Component {
	render (){
		return(
			<View style={styles.menu}>
				<Image 
					style={{width: 100, height: 100, marginTop:40}}
					source={require('../assets/icon.png')}
				/>
				<View style={styles.row}>
					<View style={styles.menu_item}>
	
						<Image 
							style={{width: 100, height: 100}}
							source={require('../assets/new_column_icon.png')}
						/>
						<Text style={styles.menu_item_text}>
							Nueva{"\n"}columna
						</Text>
					</View>
					<View style={styles.menu_item}>
						<Image 
							style={{width: 100, height: 100}}
							source={require('../assets/new_column_icon.png')}
						/>
						<Text style={styles.menu_item_text}>
							Galería{"\n"}de columnas
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.menu_item}>
						<Image 
							style={{width: 100, height: 100}}
							source={require('../assets/new_column_icon.png')}
						/>
						<Text style={styles.menu_item_text}>
							Nuevo{"\n"}núcleo
						</Text>
					</View>
					<View style={styles.menu_item}>
						<Image 
							style={{width: 100, height: 100}}
							source={require('../assets/new_column_icon.png')}
						/>
						<Text style={styles.menu_item_text}>
							Galería{"\n"}de núcleos
						</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.menu_item}>
						<Text style={styles.menu_item_text}>
							Configuración
						</Text>
					</View>
					<View style={styles.menu_item}>
						<Text style={styles.menu_item_text}>
							Sobre LithoDex
						</Text>
					</View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu_item: {
    backgroundColor: '#f2f2f2',
    borderRadius:10,
    marginRight:40,
    marginLeft:40,
    marginTop:10,
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
