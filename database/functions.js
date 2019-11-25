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


export function new_user(name, password) {

	const db = new PouchDB('lithodex')
	const current_time = new Date().getTime();

	// El id debe ser el username?
	// Por ahora si
  const user = {
  	_id: name,
	  username: name,
	  password:password,
	  created_on: current_time,
	  columns:[],
  }	

	db.get('default')
		.then(function(database){

			// Aqui debe verificar si el usuario ya existe
			// Necesito probar a admin, pero modifica esto a conveniencia
			const current_user = database.users.find(element => element._id === 'admin');
			
			if (current_user !== undefined ){
				console.log('User already exists')
			} else {
				database.users.push(user)
				console.log(name+' user created')
				console.log(database.users)
				db.put(database)
			}
			
		}).catch(function (error){
			console.log(['User creation failed',error])
		})
}

export function new_column(new_column_data) {

	const db = new PouchDB('lithodex')
	const current_time = new Date().getTime();

  const current_user_id = new_column_data.user_id
	console.log('Creating new column for '+current_user_id)
	
	// Solo para saber que tiene el payload...
  const payload = {
      column_id: current_time,
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
  	}


	db.get('default')
		.then(function(database){			
			const current_user = database.users.find(element => element._id === current_user_id);
			console.log(database)
			console.log(current_user)
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