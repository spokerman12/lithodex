import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button,
				Picker, AsyncStorage } from 'react-native';

import { Provider, connect } from 'react-redux'

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import PickerCheckBox from 'react-native-picker-checkbox'

import * as Log from '../log/functions'
import * as Database from '../database/functions'

import PouchDB from 'pouchdb-react-native'

class NewColumn extends Component {

	constructor(props) {
		super(props)
		this.handleConfirm = this.handleConfirm.bind(this)
		this.onChangeName = this.onChangeName.bind(this)
		this.onChangeLocation = this.onChangeLocation.bind(this)
		this.acceptSettings = this.acceptSettings.bind(this)

    if (this.props.navigation.getParam('columnName')){
      this.state = {
        editedGPS:true,
        columnName: this.props.navigation.getParam('columnName'),
        columnLocation: this.props.navigation.getParam('columnLocation'),
        location: null,
        longitude:this.props.navigation.getParam('longitude'),
        latitude:this.props.navigation.getParam('latitude'),
        errorMessage:null,
        scale:this.props.navigation.getParam('scale'),
        lithology: this.props.navigation.getParam('lithology'),
        structure: this.props.navigation.getParam('structure'),
        image: this.props.navigation.getParam('image'),
        fossil: this.props.navigation.getParam('fossil'),
        note: this.props.navigation.getParam('note'),
        selectedItems:this.props.navigation.getParam('selectedItems'),
      }
      console.log('en const')
      console.log(this.props.navigation.getParam('selectedItems'))
    } else {
      this.state = {
        editedGPS:false,
        columnName: '',
        columnLocation: '',
        location: null,
        longitude:null,
        latitude:null,
        errorMessage:null,
        scale:0.1,
        lithology: true,
        structure: false,
        image: false,
        fossil: false,
        note: false,
        selectedItems:null,
      }
    }

  }

  componentDidMount(){
    const log_entry = Log.new_column()
  }

  componentWillMount() {
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    
    longitude = JSON.stringify(location.coords.longitude) 
    latitude = JSON.stringify(location.coords.latitude)
    if (!this.props.navigation.getParam('latitude')){
      this.setState({ location });
      this.setState({
        longitude:longitude,
        latitude:latitude,
      })
    }
  };

  onChangeName = (text) => {
  	this.setState({columnName: text})
  }

  onChangeLocation = (text) => {
  	this.setState({columnLocation: text})
  }
  
  onChangeLongitude = (text) => {
    if (parseFloat(text)){
      this.setState({longitude: text})
    } else {
      this.setState({longitude: '0'})
    }

    this.setState({
      editedGPS:true,
    })
  }

  onChangeLatitude = (text) => {
    if (parseFloat(text)){
      this.setState({latitude: text})
    } else {
      this.setState({latitude: '0'})
    }
    this.setState({
      editedGPS:true,
    })
  }

  handleConfirm = (selectedItems) => {
    this.setState({
      structure:false,
      image:false,
      fossil:false,
      note:false,
      selectedItems:selectedItems,
    })
    console.log(selectedItems)

    var arrayLength = selectedItems.length;
    for (var i = 0; i < arrayLength; i++) {
      console.log(selectedItems[i])
      if(selectedItems[i].itemKey == 1 ){
        this.setState({structure:true})
      } else if (selectedItems[i].itemKey == 2 ){
        this.setState({fossil:true})
      } else if (selectedItems[i].itemKey == 3 ){
        this.setState({note:true})
      } else if (selectedItems[i].itemKey == 4 ){
        this.setState({image:true})
      }
    }

  }

  acceptSettings = () => {  	
    // Aqui pasamos a la siguiente pantalla
    // y se le pasa el payload como props de Navigation
    // Hacer llegar el user_id adecuado
    // segun la logica del manejo de usuarios

    // Tiempo como id secuencial de la columna para PouchDB
    const current_time = new Date().getTime();


    const payload = {
      user_id: 'admin',
      columnId: current_time,
  	  columnName: this.state.columnName,
	  	columnLocation: this.state.columnLocation,
	  	longitude:this.state.longitude,
      latitude:this.state.latitude,
	  	scale:this.state.scale,
	    lithology: this.state.lithology,
	    structure: this.state.structure,
	    image: this.state.image,
	    fossil: this.state.fossil,
	    note: this.state.note,
      selectedItems:this.state.selectedItems,

      layerList:[],
  	}

    // Se crea la nueva columna en la base de datos
    if (this.props.navigation.getParam('columnName')){
      console.log('trying to edit')
      Database.update_column(payload)

    } else {
      Database.new_column(payload)
    }
  	this.props.navigation.goBack()
  }


  render() {
    console.log('en render')
    console.log(this.props.navigation.getParam('latitude'))

    let latitude = this.state.latitude
    let longitude = this.state.longitude
    if (this.state.latitude){
      let latitude = this.state.latitude
      let longitude = this.state.longitude
    } else {
      let latitude = 'Obteniendo..';
      let longitude = 'Obteniendo..';

      if (this.state.errorMessage && !this.state.editedGPS) {
        latitude = 'No se pudo obtener la ubicación';
        longitude = 'No se pudo obtener la ubicación';
      } else if (this.state.location && !this.state.editedGPS) {
        longitude = JSON.stringify(this.state.location.coords.longitude) 
        latitude = JSON.stringify(this.state.location.coords.latitude)
      }
    } 

    let checkboxElements = [
	    { itemKey:1, itemDescription:'Estructura'},
	    { itemKey:2, itemDescription:'Fósiles'},
	    { itemKey:3, itemDescription:'Notas de texto'},
	    { itemKey:4, itemDescription:'Fotos'},
  	];

  	const {navigate} = this.props.navigation;

    return (
        <View style={{padding:10}}>
        	<View style={styles.row}>
        		<Text style={{flex:1}}>Nombre de la columna: </Text>
        		<TextInput 
              defaultValue={this.state.columnName}
              selectTextOnFocus={true}
        			style={styles.textInput}
        			onChangeText={text => this.onChangeName(text)}
        		/>
        	</View>
        	<View style={styles.row}>
        		<Text style={{flex:1}}>Ubicación: </Text>
        		<TextInput 
              defaultValue={this.state.columnLocation}
              selectTextOnFocus={true}
        			style={styles.textInput}
        			onChangeText={text => this.onChangeLocation(text)}
        		/>
        	</View>
        	<View style={styles.row}>
        		<Text style={{flex:1}}>Latitud: </Text>
        		<TextInput 
              defaultValue={latitude} 
              selectTextOnFocus={true}
              style={styles.textInput} 
              onChangeText={text => this.onChangeLatitude(text)}
              keyboardType='numeric'
            />
        	</View>
        	<View style={styles.row}>
        		<Text style={{flex:1}}>Longitud: </Text>
            <TextInput 
              defaultValue={longitude} 
              selectTextOnFocus={true}
              style={styles.textInput} 
              onChangeText={text => this.onChangeLongitude(text)}
              keyboardType='numeric'
            />
        	</View>
        	<View style={styles.row}>
        	<Text style={{flex:1}}>{"\n"}Escala (mínimo espesor de un estrato en metros): </Text>
	        	<Picker
	        		selectedValue={this.state.scale}
              style={{height: 100, width: 200, flex:1}}
              onValueChange={(itemValue, itemIndex) => this.setState({scale: itemValue})}
            >
              <Picker.Item label="0.1m" value={0.1}/>
              <Picker.Item label="1m" value={1}/>
              <Picker.Item label="10m" value={10}/>
              <Picker.Item label="100m" value={100}/>
              <Picker.Item label="1.000m" value={1000}/>
            </Picker>
          </View>
          <View style={styles.tallrow}>
          	<Text style={{flex:2}}>{"\n"}{"\n"}Campos de registro: </Text>
        		<View style={{flex:1, height: 15, width:250}}>
	        		<PickerCheckBox
	        		data={checkboxElements}
	        		style={{flex:1, height: 15, width:250}}
			        headerComponent={<Text style={{fontSize:25}}>Tipos de registro</Text>}
			        OnConfirm={(selectedItems) => this.handleConfirm(selectedItems)}
              checkedItems={this.state.selectedItems}
			        ConfirmButtonTitle='OK'
			        DescriptionField='itemDescription'
			        KeyField='itemKey'
			        placeholder='Toque aquí'
			        arrowSize={10}
			        placeholderSelectedItems ='$count tipo(s)'
			        />
			      </View>
        	</View>
        	<View>
            	<Button title="OK" onPress={this.acceptSettings}/>
          </View>
      	</View>
      );
    }
}

function mapStateToProps (state) {
  return {
	 	columnName: state.columnName,
  	columnLocation: state.columnLocation,
    longitude:state.longitude,
    latitude:state.location,
  	scale:state.scale,
    lithology: state.lithology,
    structure: state.structure,
    image: state.image,
    fossil: state.fossil,
    note: state.note,

    layerList:[],
  }
}

export default connect(mapStateToProps, null)(NewColumn);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',  
    flex: 1,
    padding:20  
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',    
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
  column: {
    flex: 1,
    flexDirection: 'column',
    opacity:1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    paddingTop:30,
    paddingBottom:45,
  },
  tallrow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    paddingTop:30,
    paddingBottom:45,
    height:150,
  },
  smallrow: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  textInput: {
  	height: 35,
  	borderWidth: 1,
  	flex: 1,
  },
});