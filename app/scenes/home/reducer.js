import {
  DELETE_CONTACT_SUCCEEDED,
  DELETE_CONTACT_FAILED,
  FETCH_ALL_CONTACTS_SUCCEEDED,
  FETCH_ALL_CONTACTS_FAILED
} from './constants';

const initialState = {
  contacts: [],
  error: null
};

const HomeReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_ALL_CONTACTS_SUCCEEDED:
      return Object.assign({}, state, {
        contacts: action.contacts
      });

    case FETCH_ALL_CONTACTS_FAILED:
    case DELETE_CONTACT_FAILED:
      return Object.assign({}, state, {
        error: action.error
      });

    case DELETE_CONTACT_SUCCEEDED:
    console.log(action.id);
      return Object.assign({}, state, {
        contacts: state.contacts.filter(contact => {
          return contact._id !== action.id;
        })
      });

      default:
        return state;
  }
}

export default HomeReducer;
