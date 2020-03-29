/* eslint-disable import/no-unresolved */
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';
import AuthActions from '~/store/ducks/auth';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, '/sessions', { email, password });
    yield localStorage.setItem('@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    yield put(push('/'));
  } catch (error) {
    console.log(error);
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no login',
      message: 'Verifique email e senha',
    }));
  }
}
export function* signOut() {
  localStorage.removeItem('@Omni:token');
  localStorage.removeItem('@Omni:team');
  yield put(push('/signin'));
}
