import {createStore ,applyMiddleware,combineReducers} from 'react-redux';
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import shopReducer from '../reducers/shopReducer'
import adminReducer from '../reducers/adminReducer'


const rootReducer = combineReducers({
    user:userReducer,
    shop:shopReducer,
    admin:adminReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;
