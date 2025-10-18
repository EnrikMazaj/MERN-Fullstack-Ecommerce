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

    const login = (userData: User) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                // Add timeout to prevent blocking for too long
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

                const response = await fetch(`${API_URL}/api/users/check-auth`, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

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
                // Silent fail - don't block on error, just assume not logged in
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkSession();
    }, []);

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
                // Logout failed but continue anyway
            }
        } catch (error) {
            // Silent fail - still clear local state
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    // Don't block rendering while checking auth - show content immediately
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
