import {Url} from "@components/button";
import styles from "./styles/registation.module.scss"

export function RegistrationSection() {
    return (
        <section className={`${styles.registration_section} center_text`}>
            <article className={`${styles.registration} hidden_once`}>
                <div className={`${styles.registration_text}`}>
                    <h2 className="unic_color">Заходи прямо сейчас</h2>
                    <p className="for_pc">1.20+ · Minecraft: Java + Bedrock Editions · Лицензия не обязательна</p>
                    <p className="for_mobile">
                        1.20+<br/>
                        Minecraft: Java + Bedrock Edition<br/>
                        Лицензия не обязательна
                    </p>
                </div>

                <Url href="/auth">
                    Влететь на сервер
                </Url>
            </article>
        </section>
    )
}