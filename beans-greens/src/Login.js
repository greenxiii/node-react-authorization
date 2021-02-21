import React, { useState } from "react";
const axios = require('axios').default;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    console.log('login', email, password);
    axios({
      method: 'post',
      url: 'http://localhost:5000/login',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      }
    }).then(function (response) {
      console.log('response', response.data);
    });;
  }

  return (
    <div>
      <header className="App-header">
        <p>
          Login page
        </p>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={(event) => setPassword(event.target.value)} />
        <button onClick={login}>Ok</button>
      </header>
    </div>
  );
}

export default Login;

