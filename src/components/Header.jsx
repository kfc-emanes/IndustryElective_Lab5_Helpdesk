import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Header() {
    const { toggleTheme } = useTheme();

    return (
        <header>
            <h1>Helpdesk Queue</h1>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </header>
    );
}