const getToken = state => state.auth.token;
const isAuth = state => state.auth.isLoggedIn;
const userName = state => state.auth.userName;

const userSelectors = { getToken, isAuth, userName };

export default userSelectors;
