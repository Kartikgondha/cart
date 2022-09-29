import * as ActionTypes from '../Actiontypes'

const inVal = {
    isLoading: false,
    product : [],
    error: ''

}

export const productreducer = (state = inVal, action) => {
    switch (action.type) {
        case ActionTypes.GET_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                error: ''
            }
        case ActionTypes.ADD_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: (state.product.concat(action.payload)),
                error: ''
            }
        case ActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.filter((c) => c.id !== action.payload),
                error: ''
            }
        case ActionTypes.UPDATE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: state.product.map((c) => {
                    if (c.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return c;
                    }
                }),
                error: ''
            }
        case ActionTypes.ERROR_PRODUCT:
            return {
                ...state,
                isLoading: false,
                product: [],
                error: action.payload
            }

        default:
            return state;
    }
}