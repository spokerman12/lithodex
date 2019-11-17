import PouchDB from 'pouchdb-react-native'

export function clear_app() {

	const db = new PouchDB('lithodex')

	db.get('default')
		.then(function(database){
			console.log('Clear Database')
			return db.put({
				_id:'default',
				_rev:database._rev,
				log:[],
				users:[]
			})
		}).catch(function (error){
			console.log('Not ok')
		})
}

export function clear_users() {

	const db = new PouchDB('lithodex')

	db.get('default')
		.then(function(database){
			console.log('Clear Users')
			return db.put({
				_id:'default',
				_rev:database._rev,
				log:database.log,
				users:[]
			})
		}).catch(function (error){
			console.log('Not ok')
		})
}



export function new_user(name='admin', password='admin') {

	const db = new PouchDB('lithodex')
	const current_time = new Date().getTime();

  const user = {
  	_id: current_time,
	  username: name,
	  password:password,
	  created_on: current_time,
	  columns:[],
  }	

	db.get('default')
		.then(function(database){
			console.log('wryy')
			console.log(database)
			database.users.push(user)
			console.log(name+' user created')
			return db.put(database)
		}).catch(function (error){
			console.log('User creation failed')
			console.log(error)
		})
}

export function new_column(payload) {

	const db = new PouchDB('lithodex')
	const current_time = new Date().getTime();

  const kek = {
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
  }

	db.get('default')
		.then(function(database){
			database.log.push(log_entry)
			console.log('Log - '+entry_type)
			return db.put(database)
		}).catch(function (error){
			console.log('Log Failed')
		})
}