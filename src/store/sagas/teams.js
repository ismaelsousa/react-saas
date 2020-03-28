/* eslint-disable import/no-unresolved */
import { call, put } from 'redux-saga/effects';
import api from '~/services/api';
import TeamActions from '~/store/ducks/teams';

export function* getTeams() {
  try {
    console.log('entrou');
    const response = yield call(api.get, '/teams');

    yield put(TeamActions.getTeamsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}
