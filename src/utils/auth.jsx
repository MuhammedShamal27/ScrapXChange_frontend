export const setTokens = (accessToken,refreshToken) =>{
    localStorage.setItem('accesToken',accessToken)
    localStorage.setItem('rereshToken',refreshToken)
};

export const getAccessToken = () =>localStorage.getItem('accessToken');
export const getRefreshToken = () =>localStorage.getItem('refreshToken');

export const clearTokens =()=>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};