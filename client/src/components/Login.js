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
        console.log(result)
        localStorage.setItem('token', result.data.payload)
        props.history.push('/something/')
      })
      .catch(err=>{
        console.log(err)
      })
  }


  return (
    <>
      <section className="LoginBox">
        <article className="LoginCard">
          <h2>Login Page</h2>
          <form>
            <input 
              type="text"
              name="username"
              onChange={handleChange}
              value={userCredentials.username}
            />
            <input 
              type="text"
              name="password"
              onChange={handleChange}
              value={userCredentials.password}
            />
            <button>Login</button>
          </form>
        </article>
      </section>
    </>
  );
};

export default Login
