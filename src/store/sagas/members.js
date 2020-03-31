/* eslint-disable import/no-unresolved */
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';
import MembersActions from '~/store/ducks/members';

export function* getMembers() {
  try {
    const response = yield call(api.get, '/members');

    yield put(MembersActions.getMembersSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `/members/${id}`, { roles: roles.map((role) => role.id) });

    yield put(toastrActions.add({
      type: 'success',
      title: 'Membro atualizado',

    }));
  } catch (error) {
    console.log(error);
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha ao atualizar',
      message: 'Verifique e tente novamente!',
    }));
  }
}
