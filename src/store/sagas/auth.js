import { call, put } from 'redux-saga/effects';
import api from '~/services/api';
import AuthActions from '~/store/ducks/auth';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, '/sessions', { email, password });
    yield localStorage.setItem('@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
  } catch (error) {
    console.log(error);
  }
}
