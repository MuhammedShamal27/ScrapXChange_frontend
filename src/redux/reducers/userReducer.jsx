import { createSlice } from '@reduxjs/toolkit'

const userInitialState = {
    user : null,
    token : null,

};

const authSlice = createSlice ({
    name : "auth",
    initialState :userInitialState,
    reducers : {
        loginSuccess : (state,action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateUser:(state,action) =>{
            state.user = action.payload.user;
        },
        logout : (state) => {
            state.user = null ;
            state.token = null ;

        },


    },
});

export const {loginSuccess,logout,updateUser} = authSlice.actions;
export default authSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit'

// const initialState ={
//     user : null,
//     token : null,
//     isAuthenticated: false,
// }

// const userSlice = createSlice({
//     name : 'auth',
//     initialState,
//     reducers:{
//         setUser(state,action) {
//             state.user = action.payload;
//             state.isAuthenticated = true;
//         },
//         setToken(state,action){
//             state.token = action.payload;
//         },
//         logout(state){
//             state.user = null;
//             state.token = null;
//             state.isAuthenticated = false;
//         },
//     },
// });


// export const {setUser , setToken , logout} =userSlice.actions;
// export default userSlice.reducer;