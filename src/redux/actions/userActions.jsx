import { setUser, setToken, logout } from "../reducers/userReducer";

export const registerUser = (userData) => async (dispatch) =>{
    try {
        const response = await API.post('user/Register/',userData)
        console.log(response.data);
    }
    catch(error){
        console.error(error.response.data);
    }
};