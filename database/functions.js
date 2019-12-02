import PouchDB from 'pouchdb-react-native'


export function dummy_database() {

	const db = new PouchDB('lithodex')
	const current_time = new Date().getTime();
	const user = {
  	_id: 'admin',
	  username: 'admin',
	  password:'admin',
	  created_on: current_time,
	  columns:[],
  }	

	return db.put({
		_id:'default',
		log:[],
		users:[user]
	}).catch(function (error){
		console.log(['Dummy DB failed',error])
	})
}


export function new_column(new_column_data) {

	const db = new PouchDB('lithodex')
	// const current_time = new Date().getTime();

  const current_user_id = new_column_data.user_id
	console.log('Creating new column for '+current_user_id)
	
	// Solo para saber que tiene el payload...
  const payload = {
      columnId: new_column_data.columnId,
  	  columnName: new_column_data.columnName,
	  	columnLocation: new_column_data.columnLocation,
	  	longitude:new_column_data.longitude,
      latitude:new_column_data.latitude,
	  	scale:new_column_data.scale,
	    lithology: new_column_data.lithology,
	    structure: new_column_data.structure,
	    image: new_column_data.image,
	    fossil: new_column_data.fossil,
	    note: new_column_data.note,
	    layerList: new_column_data.layerList,
  	}

	db.get('default')
		.then(function(database){			
			const current_user = database.users.find(element => element._id === current_user_id);
			current_user.columns.push(payload)
			console.log(['Column created',new_column_data.columnName])
			return db.put(database)
		}).catch(function (error){
			console.log(['Column creation Failed',error])
		})
}

export async function get_columns(current_user_id='admin') {

	const db = new PouchDB('lithodex')
	
	db.get('default')
		.then(function(database){			
			const current_user = database.users.find(element => element._id === current_user_id);
		 	return (current_user.columns)
		}).catch(function (error){
			console.log(['Column fetching Failed',error])
		})
}

export async function update_column(column) {

	const db = new PouchDB('lithodex')
	
	db.get('default')
		.then(function(database){			
			const index_current_user = database.users.findIndex(element => element._id === current_user_id);
		 	const index_column_to_edit = database.users[index_current_user].columns
		 		.findIndex(element => element._id === column.column_id);

		 	if (index_column_to_edit > -1){
		 		database.users[index_current_user].columns[index_column_to_edit] = column
		 	}
		 	return db.put(database)
		 		.then(function(){
		      return db.get('default');
		    }).then(function (doc) {
		      console.log(doc);
		      console.log('ACtualizadp');
		    });


		}).catch(function (error){
			console.log(['Column update failed',error])
		})
}

export async function saveLayerList(columnId, layerList){
	
	const db = new PouchDB('lithodex')
	
	const current_user_id = 'admin'

	db.get('default')
		.then(function(database){			
			const index_current_user = database.users.findIndex(element => element._id === current_user_id);
		 	const index_column_to_edit = database.users[index_current_user].columns
		 		.findIndex(element => element.columnId === columnId);
		 	console.log(columnId)
		 	console.log(database.users[index_current_user].columns)

		 	if (index_column_to_edit > -1){
		 		database.users[index_current_user].columns[index_column_to_edit].layerList = layerList
		 	}
		 	return db.put(database)
		 		.then(function(){
		      return db.get('default');
		    }).then(function (doc) {
		      console.log(doc);
		      console.log('Actualizado LayerList');
		    });


		}).catch(function (error){
			console.log(['LayerList saving failed',error])
		})	
}

export async function getLayerList(columnId){
	
	const db = new PouchDB('lithodex')
	
	const current_user_id = 'admin'

	db.get('default')
		.then(function(database){			
			const index_current_user = database.users.findIndex(element => element._id === current_user_id);
		 	const index_column = database.users[index_current_user].columns
		 		.findIndex(element => element.columnId === columnId);

		 	console.log(database.users[index_current_user].columns)

		 	if (index_column > -1){
		 		console.log(database.users[index_current_user].columns[index_column].layerList)
		 		console.log('is this layerlist')
		 		return database.users[index_current_user].columns[index_column].layerList
		 	} else {
		 		return []
		 	}

		}).catch(function (error){
			console.log(['LayerList fetch failed',error])
		})	
}

export async function saveComponentState(state, columnId, layerKey, componentKey){
	
	const db = new PouchDB('lithodex')
	const current_user_id = 'admin'

	db.get('default')
		.then(function(database){			
			const index_current_user = database.users.findIndex(element => element._id === current_user_id);
		 	const index_column_to_edit = database.users[index_current_user].columns
		 		.findIndex(element => element.columnId === columnId);

		 	if (index_column_to_edit > -1){
		 		const index_layer = database.users[index_current_user].columns[index_column_to_edit].layerList
		 			.findIndex(element => element.key === layerKey);
		 			if (componentKey.includes('lithology')){
		 				console.log('FOUND')
		 				database.users[index_current_user].columns[index_column_to_edit].layerList[index_layer].lithology_data = state
		 			} else if (componentKey.includes('structure')){
		 				database.users[index_current_user].columns[index_column_to_edit].layerList[index_layer].structure_data = state
		 			} else if (componentKey.includes('fossil')){
		 				database.users[index_current_user].columns[index_column_to_edit].layerList[index_layer].fossil_data = state
		 			} else if (componentKey.includes('image')){
		 				database.users[index_current_user].columns[index_column_to_edit].layerList[index_layer].image_data = state
		 			} else if (componentKey.includes('note')){
		 				database.users[index_current_user].columns[index_column_to_edit].layerList[index_layer].note_data = state
		 			}
		 	}
		 	return db.put(database)
		 		.then(function(){
		      return db.get('default');
		    }).then(function (doc) {
		      console.log('Component saved');
		    });


		}).catch(function (error){
			console.log(['Component save failed',error])
		})	
}