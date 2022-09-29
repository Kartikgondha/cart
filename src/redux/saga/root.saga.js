import { all } from 'redux-saga/effects'
import { authsaga } from './auth.saga'

export default function* rootsaga(){
    yield all ([
        authsaga()
    ])
}