import React, { useState } from 'react'
import { setToken } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

export default function Auth() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
      })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
    };

    const verifyUser = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })
            if (!response.ok) {
                if (response.status === 400) {
                  console.log(response.status, 'Invalid credentials')
                }
            } else {
                const result = await response.json();
                console.log('Login successful:', result);
                dispatch(setToken(result.token));
            }
        } catch (error) {
            console.error("success: false", error.message)
        }
    }
    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form id="loginForm" onSubmit={verifyUser}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={credentials.username}
                        name="username"
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={credentials.password}
                        name="password"
                        onChange={handleInputChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}
