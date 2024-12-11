import '../styles/Navbar.css'
import Search from './Search.js'
import Login from './Login.js'
import Account from './Account.js';
import Cart from './Cart.js';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import React, { useContext } from 'react';
import { FaHome, FaUser, FaShoppingCart, FaEnvelope, FaSignInAlt} from 'react-icons/fa';

export default function Navbar() {
    const { isAuthenticated } = useContext(UserContext);
    const { user } = useContext(UserContext);
    return (
        <header>
            <ul>
                <li><Link to="/" id="name">Thrifty</Link></li>
                <Search />
                <li><FaEnvelope className="icon" /></li>
                <li><Link to ="/Cart"><FaShoppingCart className="icon" /></Link></li>
                {isAuthenticated ? (
                    <li><Link to="/Account"><FaUser className="icon" /></Link></li>
                ) : (
                    <li><Link to="/Login"><FaSignInAlt className="icon"/></Link></li>
                )}
            </ul>
        </header>
    );
}