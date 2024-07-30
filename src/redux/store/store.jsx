import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'
import shopReducer from '../reducers/shopReducer'
import adminReducer from '../reducers/adminReducer'


const store = configureStore({
    reducer:{
        user : userReducer,
        shop : shopReducer,
        admin : adminReducer,

    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    // middleware:(getDefaultMiddleware) => getDefaultMiddleware,
})

export default store;

// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { thunk } from 'redux-thunk';


// const rootReducer = combineReducers({
//     user:userReducer,
//     shop:shopReducer,
//     admin:adminReducer,
// })

// const store = createStore(rootReducer,applyMiddleware(thunk));
