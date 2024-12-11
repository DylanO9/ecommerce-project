import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the user state
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false); // Context is now ready
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    if (loading) {
        return <div>Loading...</div>; // Optionally show a loader
    }

    return (
        <UserContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
