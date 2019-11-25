import PouchDB from 'pouchdb-react-native'

export function open_app() {

	const db = new PouchDB('lithodex',{auto_compaction: true})
	const current_time = new Date().getTime();
	const entry_type = 'Open app'
	const entry_code = 0

  const log_entry = {
  	_id: current_time,
	  action: entry_type,
	  code:entry_code,
	  time: current_time,
  }	

	db.get('default')
		.then(function(database){
			database.log.push(log_entry)
			console.log('Log - '+entry_type)
			return db.put(database)
		}).catch(function (error){
			console.log(['Log Failed',error])
		})
}

export function open_main_menu() {

	const db = new PouchDB('lithodex',{auto_compaction: true})
	const current_time = new Date().getTime();
	const entry_type = 'Open Main Menu'
	const entry_code = 1

  const log_entry = {
  	_id: current_time,
	  action: entry_type,
	  code:entry_code,
	  time: current_time,
  }	

	db.get('default')
		.then(function(database){
			database.log.push(log_entry)
			console.log('Log - '+entry_type)
			return db.put(database)
		}).catch(function (error){
			console.log(['Log Failed',error])
		})
}

export function new_column() {

	const db = new PouchDB('lithodex',{auto_compaction: true})
	const current_time = new Date().getTime();
	const entry_type = 'New Column'
	const entry_code = 2

  const log_entry = {
  	_id: current_time,
	  action: entry_type,
	  code:entry_code,
	  time: current_time,
  }	

	db.get('default')
		.then(function(database){
			database.log.push(log_entry)
			console.log('Log - '+entry_type)
			return db.put(database)
		}).catch(function (error){
			console.log(['Log Failed',error])
		})
}

export function back_to_menu() {

	const db = new PouchDB('lithodex',{auto_compaction: true})
	const current_time = new Date().getTime();
	const entry_type = 'Back to menu'
	const entry_code = 3

  const log_entry = {
  	_id: current_time,
	  action: entry_type,
	  code:entry_code,
	  time: current_time,
  }	

	db.get('default')
		.then(function(database){
			database.log.push(log_entry)
			console.log('Log - '+entry_type)
			return db.put(database)
		}).catch(function (error){
			console.log(['Log Failed',error])
		})
}