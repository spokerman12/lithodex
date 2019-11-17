const initialState = {
	id_count : 0,
	column_list: [{
			id : 0,
			column : {
			  	columnName: '',
			  	columnLocation: '',
			  	location: null,
			  	errorMessage:null,
			  	scale:0.1,
			    lithology: true,
			    structure: false,
			    image: false,
			    fossil: false,
			    note: false,
			}
	}]
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
  	// Las acciones deberian ser constantes
    case 'ACCEPT_NEW_COLUMN':
      return {
        column_list: state
      };
    case 'LOAD_NEW_COLUMN':
      return {
        count: state.count + 1
      };
    case 'SAVE_NEW_COLUMN':
      return {
        count: state.count + 1
      };

    default:
      return state;
  }
}

