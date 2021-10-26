import React, { useEffect, useState } from "react"
import Toggle from 'react-toggle'

const THEME_KEY = "theme"
const THEME_BLACK = "dark"
const THEME_LIGHT = "light"

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY));
    const [checked, setChecked] = useState(theme == THEME_BLACK)

    useEffect(() => {
        // update body style
        document.body.className = theme
        
        // update checked status
        setChecked(theme == THEME_BLACK)
    }, [theme]);

    const handleChange = e => {
        if(e.target.checked) {
            setTheme(THEME_BLACK)
        } else {
            setTheme(THEME_LIGHT)
        }
    }

    return (
        <Toggle 
            defaultChecked={checked}
            onChange={handleChange}
        />
    )
}

export default ThemeToggle