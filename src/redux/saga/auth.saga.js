import * as ActionTypes from '../Actiontypes'
import { all, call, put, takeEvery } from "redux-saga/effects";
import { history } from '../../history';
import { ForgotPassswordApi, GoogleLoginApi, logoutApi, signinApi, signupApi } from '../../Common/Api/auth.api';
import { LoggedoutAction, signedinAction } from '../action/Action';
import { setAlert } from '../action/alert.action';


function* signup(action) {
    try {
      const user = yield call(signupApi, action.payload);
      // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
      console.log(user);
      yield put(setAlert({ text: user.payload, color: "success" }));
    } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
      console.log(e);
      yield put(setAlert({ text: e.payload, color: "error" }));
    }
  }
  
  function* signin(action) {
    try {
      const user = yield call(signinApi, action.payload);
      console.log(user.payload);
      yield put(signedinAction(user.payload));
      history.push("/");
      yield put(setAlert({ text: "Login Successfull", color: "success" }));
    } catch (e) {
      console.log(e);
      yield put(setAlert({ text: e.payload, color: "error" }));
    }
  }
  
  function* logout(action) {
    try {
      const user = yield call(logoutApi);
      yield put(LoggedoutAction(user.payload));
      history.push("/");
      yield put(setAlert({ text: "Logout Successfull", color: "success" }));
    } catch (e) {
      yield put(setAlert({ text: e.payload, color: "error" }));
    }
  }
  
  function* googleLogin(action) {
    try {
      const user = yield call(GoogleLoginApi);
      yield put(signedinAction(user.payload));
      history.push("/");
      yield put(setAlert({ text: "Logout Successfull", color: "success" }));
    } catch (e) {
      yield put(setAlert({ text: e.payload, color: "error" }));
    }
  }
  
  function* forgotPassword(action) {
    try{
      const user = yield call(ForgotPassswordApi, action.payload)
      history.push("/");
      yield put(setAlert({ text: user.payload, color: "success" }));
      console.log(user);
    }catch(e){
      console.log(e);
      yield put(setAlert({ text: e.payload, color: "error" }));
  
    }
  }
  
  function* watchSignup() {
    yield takeEvery(ActionTypes.SIGN_UP, signup);
  }
  
  function* watchSignin() {
    yield takeEvery(ActionTypes.SIGN_IN, signin);
  }
  
  function* watchLogout() {
    yield takeEvery(ActionTypes.LOG_OUT, logout);
  }
  
  function* watchGoogleLogin() {
    yield takeEvery(ActionTypes.GOOGLE_LOGIN, googleLogin);
  }
  
  function* watchForgotPassword() {
    yield takeEvery(ActionTypes.FORGOT_PASSWORD, forgotPassword);
  }
  
  export function* authsaga() {
    yield all([watchSignup(), watchSignin(), watchLogout(), watchGoogleLogin(), watchForgotPassword()]);
  }
  
  