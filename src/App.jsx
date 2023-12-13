import { useState } from "react";
import  LoginByUserPass  from "./user";

function App() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const Login =async(e)=> {
  e.preventDefault();
  await LoginByUserPass(username, password);
}

  return (
    <>
      <h1>Improved Juicebox</h1>
      <form onSubmit={Login}>
        <input placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        <input placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <button>Log In</button>
      </form>
    </>
  )
}

export default App
