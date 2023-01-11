import styles from "../styles/Home.module.css"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonFill, SunFill } from "react-bootstrap-icons";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);

        //Determine system theme so we can properly set the theme value
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, [])

    if (!mounted) {
        return <></>;
    }

    const switchTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className={styles.toggleSwitch}>
            <button onClick={switchTheme}>
                {theme === "dark" ? <SunFill /> : <MoonFill />}
            </button>
        </div>
    );
};
