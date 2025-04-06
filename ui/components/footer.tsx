// Стили
import styles from "./styles/footer.module.scss";

// Компоненты
import {Urls} from "./urls";
import {NavLink} from "@components/navlink";

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

                <div className={`${styles.links} flex_center`}>
                    <NavLink href="/rules/terms-of-use" className="mini_button">
                        Пользовательское соглашение
                    </NavLink>
                    <NavLink href="/rules/privacy-policy" className="mini_button">
                        Политика конфиденциальности
                    </NavLink>
                </div>

                <small className={`light_gray_color ${styles.mc}`}>
                    Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang
                    Synergies AB, Microsoft Corporation or other rightsholders.
                </small>
            </div>
        </footer>
    )
}