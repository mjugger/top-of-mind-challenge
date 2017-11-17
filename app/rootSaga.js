import { fork } from 'redux-saga/effects';
import contactSagas from './scenes/home/sagas';
import contactFormSagas from './scenes/contactForm/sagas';

const sagas = [
  ...contactSagas,
  ...contactFormSagas
]

export default function* RootSaga() {
  yield sagas.map(saga => fork(saga));
}
