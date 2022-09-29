import * as ActionTypes from '../Actiontypes'


export const singupAction = (values)=>(dispatch)=>{
    dispatch({type: ActionTypes.SIGN_UP, payload: values})
}

export const singinAction = (values)=>(dispatch)=>{
    dispatch({type:ActionTypes.SIGN_IN, payload: values})
}

export const signedinAction = (values)=> (dispatch)=>{
    dispatch({type:ActionTypes.SIGNED_IN, payload: values})
}
export const LogoutAction = ()=>(dispatch)=>{
    dispatch({type:ActionTypes.LOG_OUT})
}
export const LoggedoutAction = ()=>(dispatch)=>{  
    dispatch({type:ActionTypes.LOGGED_OUT})

}

export const GoogleLoginAction = ()=>(dispatch)=>{
    dispatch({type: ActionTypes.GOOGLE_LOGIN,})

}

export const ForgotPasswordAction = (values)=>(dispatch)=>{
    dispatch({type:ActionTypes.FORGOT_PASSWORD, payload: values})
}

