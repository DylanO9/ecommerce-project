import React from 'react';
import '../styles/Signup.css';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Signup successful:', data);
                loginUser(data);
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Signup error:', errorData);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }

    return (
        <main id="signup">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name:</label>
                <input type="text" id="first_name" name="first_name" required />
                <label htmlFor="last_name">Last Name:</label>
                <input type="text" id="last_name" name="last_name" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="phone_number">Phone Number:</label>
                <input type="tel" id="phone_number" name="phone_number" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Signup</button>
            </form>
        </main>
    )
}