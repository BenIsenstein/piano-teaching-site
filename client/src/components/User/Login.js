import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import AuthenticationContext from "../../auth/AuthenticationContext"
import "./Signup.css"
import "./Login.css"

const Login = () => {
  const authContext = useContext(AuthenticationContext)
  const { register, formState: { errors }, handleSubmit } = useForm({})

  return (
    <div className="pageBackground">
      <form className="signup-form-container" onSubmit={handleSubmit(async (data) => await authContext.logIn(data))}>
        <div className="signup-form">
          <div className="signup-form-content">
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                name="username" 
                id="username"
                {...register("username", {required: "You must input a username."})}
              />
              {errors.username && <p className="signup-form-error-message">{errors.username.message}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password"
                {...register("password", {required: "You must input a password."})}
              />
              {errors.password && <p className="signup-form-error-message">{errors.password.message}</p>}
            </div>
            <div>
              <input className="signupButton" type="submit" value="Log In" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
