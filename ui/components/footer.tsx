// Стили
import styles from "./styles/footer.module.scss";

// Компоненты
import {Urls} from "./urls";
import {NavLink} from "@components/navlink";

export function Policies() {
    return (
        <small className={styles.links}>
            <NavLink href="/rules" className="mini_button" exact>
                Правила
            </NavLink>
            <NavLink href="/rules/legal/terms-of-use" className="mini_button">
                Пользовательское соглашение
            </NavLink>
            <NavLink href="/rules/legal/privacy-policy" className="mini_button">
                Политика конфиденциальности
            </NavLink>
        </small>
    )
}

export function Footer() {
    const YEAR = new Date().getFullYear()

    return (
        <footer className={styles.container}>
            <div className={styles.box}>
                <div>
                    <Urls className="urls"/>

                    {/*Копирайт*/}
                    <h4 className="center_text">
                        &#169; MineBridge 2022-{YEAR}
                    </h4>
                </div>

                <Policies/>

                <small className={`light_gray_color ${styles.mc}`}>
                    Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang
                    Synergies AB, Microsoft Corporation or other rightsholders.
                </small>
            </div>
        </footer>
    )
}