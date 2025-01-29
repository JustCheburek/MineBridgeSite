// Стили
import "./styles/footer.scss";

// Компоненты
import {Urls} from "./urls";

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
                <small>
                    <p>
                        Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang Synergies AB, Microsoft Corporation or other rightsholders.
                    </p>
                </small>
            </div>
        </footer>
    )
}