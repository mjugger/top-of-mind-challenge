import { combineReducers } from 'redux';
import HomeReducer from './scenes/home/reducer';
import ContactFormReducer from './scenes/contactForm/reducer';


const RootReducer = combineReducers({
  HomeReducer,
  ContactFormReducer
});

export default RootReducer;
