import {
  DELETE_CONTACT_REQUESTED,
  DELETE_CONTACT_SUCCEEDED,
  DELETE_CONTACT_FAILED,
  FETCH_ALL_CONTACTS_REQUESTED,
  FETCH_ALL_CONTACTS_SUCCEEDED,
  FETCH_ALL_CONTACTS_FAILED
} from './constants';

export const deleteContactRequest = id => {
  return {
    type: DELETE_CONTACT_REQUESTED,
    id
  }
};

export const deleteContactSuccess = id => (
  {
    type: DELETE_CONTACT_SUCCEEDED,
    id
  }
);

export const deleteContactFailure = error => (
  {
    type: DELETE_CONTACT_FAILED,
    error
  }
);

export const fetchAllContactsRequest = () => (
  { type: FETCH_ALL_CONTACTS_REQUESTED }
);

export const fetchAllContactsSuccess = flags => (
  {
    type: FETCH_ALL_CONTACTS_SUCCEEDED,
    flags
  }
);

export const fetchAllContactsFailure = error => (
  {
    type: FETCH_ALL_CONTACTS_FAILED,
    error
  }
);
