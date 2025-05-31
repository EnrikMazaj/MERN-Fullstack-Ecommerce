import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'el';

interface ThemeContextType {
    language: Language;
    toggleLanguage: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language');
        return (savedLanguage as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.setAttribute('lang', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'el' : 'en');
    };

    return (
        <ThemeContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 
