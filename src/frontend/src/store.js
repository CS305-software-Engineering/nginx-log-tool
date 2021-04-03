import {createStore} from 'redux';
import appReducer from './service/reducers/index';


const store = createStore(appReducer)

export default store;