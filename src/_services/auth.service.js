import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const login = async (user) =>{
	const res = await axios.post(`${API_URL}/auth/login1`,user);
    if(res.status ===200)
        setToken(user);
    return res;
}

function setToken(user) {
    window.localStorage.setItem("isLogedIn",true);
    return;
}