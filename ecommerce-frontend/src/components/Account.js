import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom'; // You can use Navigate for redirection after logout
import '../styles/Account.css';

export default function Account() {
    const { user, logoutUser } = useContext(UserContext); // Destructure both from context
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(); // Call logoutUser function from context
        setIsLoggedOut(true); // Set state to indicate that the user is logged out
        navigate('/'); // Redirect to home page
    };

    return (
        <main id="account">
            <nav id="account-nav">
                <ul>
                    <li>Personal Information</li>
                    <li>Billing & Payment</li>
                    <li>Order History</li>
                </ul>
            </nav>
            {user ? (
                <section id="account-details">
                    <h2>Personal Information</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                    <ul >
                        <li>First Name<span className="account-info">{user.first_name}</span></li>
                        <li>Last Name<span className="account-info">{user.last_name}</span></li>
                        <li>Email<span className="account-info">{user.email}</span></li>
                        <li>Phone<span className="account-info">{user.phone_number}</span></li>
                    </ul>
                </section>
            ) : (
                <p>No user information available</p>
            )}
        </main>
    );
}
