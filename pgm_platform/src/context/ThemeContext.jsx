import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

export const MyMUITheme = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Create a theme instance based on the isDarkMode state
    const theme = useMemo(() => createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: { main: '#556cd6' },
            secondary: { main: '#9747FF' },
            error: { main: '#D32F2F' },
            blueGrey: { main: '#eceff1' },
            background: { default: isDarkMode ? '#333' : '#fff' },
            text: { primary: isDarkMode ? '#fff' : '#333' },
        },
    }), [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
