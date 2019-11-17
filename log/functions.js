import PouchDB from 'pouchdb-react-native'

export function clear_log() {

	const db = new PouchDB('lithodex')
	
	db.get('default')
		.then(function(database){
			console.log('OK')
			return db.put({
				_id:'default',
				_rev:database._rev,
				log:[]
			})
		}).catch(function (error){
			console.log('Not ok')
		})
}


export function open_app() {

	const db = new PouchDB('lithodex')
	const current_time = new Date().getTime();
	const entry_type = 'Open app'
  const log_entry = {
  	_id: current_time,
	  action: entry_type,
	  code:0,
	  time: current_time,
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

export function open_main_menu() {

	const db = new PouchDB('lithodex')
	const current_time = new Date().getTime();
	const entry_type = 'Open Main Menu'
  const log_entry = {
  	_id: current_time,
	  action: entry_type,
	  code:0,
	  time: current_time,
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