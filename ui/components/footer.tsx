// Стили
import "./styles/footer.scss";

// Компоненты
import {Urls} from "./urls";
import Link from "next/link";

export function Footer() {
    const YEAR = new Date().getFullYear()

    return (
        <footer>
            <div className="footer">
                <Urls className="urls"/>

                {/*Копирайт*/}
                <p className="center_text">
                    &#169; MineBridge 2022-{YEAR}
                </p>
                <Link className="unic_color medium-font center_text"
                   href="https://docs.google.com/document/d/1EwOizUalpazLDMlw6yQijd5oVN39IF473J0TD0n47gE/edit?usp=sharing"
                   target="_blank">
                    Пользовательское соглашение
                </Link>
                <small>
                    <p>
                        Вся размещенная информация на сайте не является публичной офертой
                    </p>
                    <p>
                        Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang Synergies AB, Microsoft Corporation or other rightsholders.
                    </p>
                </small>
            </div>
        </footer>
    )
}