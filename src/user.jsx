import axios from "axios";

const LoginByUserPass = async(user, pass) => {
    try {
        const body = {username: user, password: pass}
        const response = await axios.post('/users/login', body);
        console.log(response.data);       
    } catch (error) { 
        console.log(error)   
    }
}
export default LoginByUserPass;