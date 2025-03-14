import React from 'react'

const Login = () => {
    return (
        <div >
            <h1> Login </h1>
            <form action="#">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <br />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <br />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login
