import axios from "axios"

const Login = async(e) => {
    e.preventDefault();
    try {
        const body = {username:'Moe', password:'Moe'}
        const response = await axios.post('/users/login', body);
        console.log(response.data);       
    } catch (error) { 
        console.log(error)   
    }
}
export default Login;