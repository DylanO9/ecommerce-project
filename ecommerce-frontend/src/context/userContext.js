import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the user state
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Default user state is null
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // You can initialize user data here if needed (e.g., from localStorage)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData)); // Optionally save user data to localStorage
    };

    const logoutUser = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
