import * as ActionTypes from '../Actiontypes'

const iniVal = {
  text: "",
  color: "",
};

export const alertRedecer = (state = iniVal, action) => {
  switch (action.type) {
    case ActionTypes.SET_ALERT:
        return {
            ...state,
            text : action.payload.text,
            color : action.payload.color,
        }
        case ActionTypes.RESET_ALERT:
            return {
                ...state,
                text : '',
                color : '',
            }
            default :
            return state
  }
};
