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

const initialState = {
  name: '',
  email: '',
  address: '',
  type: '',
  leadscore: '',
  yearsknown: '',
  relation: '',
  number: '',
  numbertype: ''
};

const contactFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SINGLE_CONTACT_SUCEEEDED:
      return Object.assign({}, state, {...action.contact});

    case FETCH_SINGLE_CONTACT_FAILED:
    case UPDATE_SINGLE_CONTACT_FAILED:
    case CREATE_CONTACT_FAILED:
      return Object.assign({}, state, {
        error: action.error
      });

      default:
        return state;
  }
}

export default contactFormReducer;
