/* eslint-disable import/no-unresolved */
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';
import ProjectsActions from '~/store/ducks/projects';

export function* getProjects() {
  try {
    const response = yield call(api.get, '/projects');

    yield put(ProjectsActions.getProjectsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createProject({ title }) {
  try {
    const response = yield call(api.post, '/projects', { title });

    yield put(ProjectsActions.createProjectSuccess(response.data));
    yield put(ProjectsActions.closeProjectModal());
  } catch (error) {
    console.log(error);
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha ao criar projeto',
      message: 'Verifique title e tente novamente!',
    }));
  }
}
