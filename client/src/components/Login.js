import React, {useState} from 'react'
import axios from 'axios'

const Login = (props) => {

  const apiAuthUrl = 'http://localhost:5000/api/login'

  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: ''
  })


  //boilerplate changehandler for text fields
  const handleChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value
    })
  }

  //login button pressed
  const handleLogin = (event) => {
    event.preventDefault()

    axios.post(apiAuthUrl, userCredentials)
      .then(result => {
        localStorage.setItem('token', result.data.payload)
        props.history.push('/something/')
      })
      .catch(err=>{
        console.log(err)
      })
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login
