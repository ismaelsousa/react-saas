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
