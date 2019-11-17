function open_app() {
	var current_time = new Date().getTime();
  return {
  	_id: current_time,
	  action: 'Open app',
	  code:0,
	  time: current_time,
  }	
}
