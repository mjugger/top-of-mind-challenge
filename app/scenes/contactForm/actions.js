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

export const fetchSingleContactRequest = id => (
  {
    type: FETCH_SINGLE_CONTACT_REQUESTED,
    id
  }
);

export const fetchSingleContactSuccess = contact => (
  {
    type: FETCH_SINGLE_CONTACT_SUCEEEDED,
    contact
  }
);

export const fetchSingleContactFailure = error => (
  {
    type: FETCH_SINGLE_CONTACT_FAILED,
    error
  }
);

export const updateSingleContactRequest = (data, id) => (
  {
    type: UPDATE_SINGLE_CONTACT_REQUESTED,
    data,
    id
  }
);

export const updateSingleContactSuccess = () => (
  { type: UPDATE_SINGLE_CONTACT_SUCEEEDED }
);

export const updateSingleContactFailure = error => (
  {
    type: UPDATE_SINGLE_CONTACT_FAILED,
    error
  }
);

export const createContactRequest = data => (
  {
    type: CREATE_CONTACT_REQUESTED,
    data
  }
);

export const createContactSuccess = () => (
  { type: CREATE_CONTACT_SUCEEEDED }
);

export const createContactFailure = error => (
  {
    type: CREATE_CONTACT_FAILED,
    error
  }
);
