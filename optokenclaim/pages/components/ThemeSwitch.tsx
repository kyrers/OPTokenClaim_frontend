import styles from "../../styles/Home.module.css"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BrightnessHighFill, BrightnessLowFill, Lightbulb, LightbulbFill, MoonFill, SunFill } from "react-bootstrap-icons";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [optionThemeName, setOptionThemeName] = useState();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
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
