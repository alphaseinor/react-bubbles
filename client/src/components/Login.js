import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

const Login = (props) => {

  const apiAuthUrl = 'http://localhost:5000/api/login'

  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: ''
  })

  const [bannerMessage, setBannerMessage] = useState("Enter Your Username and Password")


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
        setBannerMessage("Enter Your Username and Password")
        localStorage.setItem('token', result.data.payload)
        props.history.push('/something/')
      })
      .catch(err=>{
        console.log(err)
        setBannerMessage("You Entered an Incorrect Username or Password, Please Try Again")
      })
  }


  return (
    <>
      {
        localStorage.getItem('token')?(
          <Redirect to='/something/' />      
        ):( 
          <>
          <section className="LoginBox">
            <article className="LoginCard">
              <h2>Login Page</h2>
              <p>
                {bannerMessage}
              </p>
              <form
                onSubmit={(event) => handleLogin(event)}
              >
                <input 
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={userCredentials.username}
                />
                <input 
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={userCredentials.password}
                />
                <button>Login</button>
              </form>
            </article>
          </section>
        </>
      )}
    </>
  );
};

export default Login
