import * as ActionTypes from '../Actiontypes'


const initVal = {
  isLoading: false,
  user: null,
  error: "",
};

export const authreducer = (state = initVal , action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case ActionTypes.SIGNED_IN:
      return {
        ...state,
        isLoading : false,
        user : action.payload,
        error: ''
      }
      case ActionTypes.LOGGED_OUT: 
      return {
        ...state,
        isLoading : false,
        user : null,
        error: '' 
      }


    default:
      return state;
  }
};
