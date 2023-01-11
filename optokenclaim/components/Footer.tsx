import styles from "../styles/Home.module.css"
import { Twitter, Discord, Medium } from "react-bootstrap-icons";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <a href="https://twitter.com/EthernautDAO" target="_blank" rel="noopener noreferrer">
                    <Twitter size={24} />
                </a>
                <a href="https://discord.com/invite/RQ5WYDxUF3" target="_blank" rel="noopener noreferrer">
                    <Discord size={24} />
                </a>
                <a href="https://ethernautdao.medium.com/" target="_blank" rel="noopener noreferrer">
                    <Medium size={24} />
                </a>
            </div>

            <a className="ethernaut-footer" href="https://mint.ethernautdao.io/" target="_blank" rel="noopener noreferrer">
                <p>EthernautDAO 2023✧</p>
            </a>
        </footer>
    );
}
