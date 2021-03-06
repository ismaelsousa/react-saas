/* eslint-disable import/no-unresolved */
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';
import TeamActions from '~/store/ducks/teams';

export function* getTeams() {
  try {
    const response = yield call(api.get, '/teams');

    yield put(TeamActions.getTeamsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createTeam({ name }) {
  try {
    const response = yield call(api.post, '/teams', { name });
    yield put(TeamActions.createTeamSuccess(response.data));
    yield put(TeamActions.closeTeamModal());
  } catch (error) {
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro na operação',
      message: 'Houve um erro, tente novamente!',
    }));
    console.log(error);
  }
}
