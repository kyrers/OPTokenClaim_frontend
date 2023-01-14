import styles from "../styles/Home.module.css"
import { useTheme } from "next-themes";
import { MoonFill, SunFill } from "react-bootstrap-icons";
import { useEffect } from "react";
import useIsMounted from "../hooks/useIsMounted";

export default function ThemeSwitch() {
    const { mounted } = useIsMounted();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
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
