import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { API_URL } from '../config/api';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(`${API_URL}/api/users/check-auth`, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.user) {
                        login(data.user);
                    } else {
                        setIsLoggedIn(false);
                        setUser(null);
                    }
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Session check error:', error);
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = (userData: User) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setUser(null);
            } else {
                console.error('Logout failed:', await response.text());
            }
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 
