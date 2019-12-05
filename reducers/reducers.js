const initialState = {
  current_user:'admin',
	columns: [],
  loading:true,
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

