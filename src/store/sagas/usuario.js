import { call, put } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { Creators as UsuarioActions } from 'store/ducks/usuario';

export function* getUserLogin(action) {
  try {
    const auth = firebase.auth()
    const result = yield call(
      [auth, auth.signInAndRetrieveDataWithEmailAndPassword],
      action.payload.login,
      action.payload.senha
    )
    yield put(UsuarioActions.userLoginSuccess(result));
  } catch (err) {
    console.tron.log('erro saga');
    console.tron.log(err);
    yield put(UsuarioActions.userLoginFailed(err.code));
  }
}

export function* postUserLogin(action) {
  try {
    const create = firebase.auth();
    const result = yield call(
      [create, create.createUserAndRetrieveDataWithEmailAndPassword],
      action.payload.login,
      action.payload.senha
    )

    

    yield put(UsuarioActions.userLoginSuccess(result));
  } catch (err) {
    console.tron.log('erro saga');
    console.tron.log(err);
    yield put(UsuarioActions.userLoginFailed(err.code));
  }
}

