import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchAllContacts, deleteContact } from '../../services/apis/contact.api';
import {
  FETCH_ALL_CONTACTS_REQUESTED,
  FETCH_ALL_CONTACTS_SUCCEEDED,
  FETCH_ALL_CONTACTS_FAILED,
  DELETE_CONTACT_REQUESTED,
  DELETE_CONTACT_SUCCEEDED,
  DELETE_CONTACT_FAILED
} from './constants';

function* fetchAllContactsSaga() {
  try {
    const contacts = yield call(fetchAllContacts);
    yield put({type: FETCH_ALL_CONTACTS_SUCCEEDED, contacts});
  } catch(error) {
    yield put({type: FETCH_ALL_CONTACTS_FAILED, error});
  }
}

function* deleteContactSaga(action) {
  try {
    const contactId = yield call(deleteContact, action.id);
    yield console.log('contactId: ', contactId);
    yield put({type: DELETE_CONTACT_SUCCEEDED, ...contactId});
  } catch(error) {
    yield put({type: DELETE_CONTACT_FAILED, error});
  }
}

function* watchFetchAllContactsSaga() {
  yield takeLatest('FETCH_ALL_CONTACTS_REQUESTED', fetchAllContactsSaga);
}

function* watchDeleteContactSaga() {
  yield takeLatest('DELETE_CONTACT_REQUESTED', deleteContactSaga);
}
const contactSagas = [
  watchFetchAllContactsSaga,
  watchDeleteContactSaga
];
export default contactSagas;
