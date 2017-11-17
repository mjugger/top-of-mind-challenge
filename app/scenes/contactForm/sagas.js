import { put, takeLatest, call } from 'redux-saga/effects';
import { newContact, updateContact, fetchContact } from '../../services/apis/contact.api';
import {
  FETCH_SINGLE_CONTACT_REQUESTED,
  FETCH_SINGLE_CONTACT_SUCEEEDED,
  FETCH_SINGLE_CONTACT_FAILED,
  UPDATE_SINGLE_CONTACT_REQUESTED,
  UPDATE_SINGLE_CONTACT_SUCEEEDED,
  UPDATE_SINGLE_CONTACT_FAILED,
  CREATE_CONTACT_REQUESTED,
  CREATE_CONTACT_SUCEEEDED,
  CREATE_CONTACT_FAILED
} from './constants';

function* fetchcontactSaga(action) {
  try {
    const contact = yield call(fetchContact, action.id);
    yield put({type: FETCH_SINGLE_CONTACT_SUCEEEDED, contact});
  } catch(error) {
    yield put({type: FETCH_SINGLE_CONTACT_FAILED, error});
  }
}

function* updatecontactSaga(action) {
  try {
    yield call(updateContact, action.data, action.id);
    yield put({type: UPDATE_SINGLE_CONTACT_SUCEEEDED});
  } catch(error) {
    yield put({type: UPDATE_SINGLE_CONTACT_FAILED, error});
  }
}
 
function* newcontactSaga(action) {
  try {
    yield call(newContact, action.data);
    yield put({type: CREATE_CONTACT_SUCEEEDED});
  } catch(error) {
    yield put({type: CREATE_CONTACT_FAILED, error});
  }
}

function* watchFetchcontactSaga() {
  yield takeLatest('FETCH_SINGLE_CONTACT_REQUESTED', fetchcontactSaga);
}

function* watchUpdatecontactSaga() {
  yield takeLatest('UPDATE_SINGLE_CONTACT_REQUESTED', updatecontactSaga);
}

function* watchNewcontactSaga() {
  yield takeLatest('CREATE_CONTACT_REQUESTED', newcontactSaga);
}
const contactFormSagas = [
  watchFetchcontactSaga,
  watchUpdatecontactSaga,
  watchNewcontactSaga
];
export default contactFormSagas;
