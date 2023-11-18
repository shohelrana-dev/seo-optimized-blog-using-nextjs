import { useEffect, useState } from "react"

export default function useThemeSwitch(): [string, (theme: string) => void] {
    const preferDarkQuery = "(prefers-color-schema:dark)"
    const storageKey = "theme"

    function toggleTheme(theme: string) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        window.localStorage.setItem(storageKey, theme)
    }

    function getUserPreference() {
        const userPref = window.localStorage.getItem(storageKey)

        if (userPref) {
            return userPref
        }

        return window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light'
    }

    const [mode, setMode] = useState('dark')

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery)

        function handleChange() {
            const newMode = getUserPreference()
            setMode(newMode)
            toggleTheme(newMode)
        }

        handleChange()

        mediaQuery.addEventListener("change", handleChange)

        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
    }, [])

    useEffect(() => {
        toggleTheme(mode)
    }, [mode])


    return [mode, setMode]
}