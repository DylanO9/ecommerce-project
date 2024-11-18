import { useState } from 'react'; // Import useState to manage form inputs
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import React, { useContext } from 'react';

export default function Login() {
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const { loginUser } = useContext(UserContext); // Get the loginUser function from the UserContext
    const navigate = useNavigate(); // React Router's navigation hook

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // If response is successful
            if (response.ok) {
                const data = await response.json();
                // Optionally, save the token or handle successful login
                console.log('Login successful:', data);
                navigate('/'); // Redirect to home or dashboard
                loginUser(data); // Set the user data in the context
            } else {
                // If response is not successful, show error message
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Invalid credentials, please try again.');
            }

        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('There was an error with the server, please try again later.');
        }
    };

    return (
        <main id="login">
            <h1>Log in</h1>
            <h3>Don't have an account? <a href="/signup">Sign up</a></h3>

            {/* Display error message if any */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required
                />

                <button type="submit">Log in</button>
            </form>
        </main>
    );
}
