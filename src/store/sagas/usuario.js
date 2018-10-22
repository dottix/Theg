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
    yield put(UsuarioActions.getUserLoginSuccess(result));
  } catch (err) {
    console.tron.log('erro saga');
    console.tron.log(err);
    yield put(UsuarioActions.getUserLoginFailed(err.code));
  }
}


