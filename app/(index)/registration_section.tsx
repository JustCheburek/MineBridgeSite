import {Url} from "@components/button";
import styles from "./styles/registation.module.scss"

const RegistrationSection = () => (
    <section className={`${styles.registration_section} center_text`}>
        <article className={`${styles.registration} hidden_once`}>
            <div className={`${styles.registration_text}`}>
                <h2 className="unic_color">Заходи прямо сейчас</h2>
                <p className="for_pc">
                    {process.env.NEXT_PUBLIC_VERSION} · Minecraft: Java Edition · Лицензия не обязательна
                </p>
                <p className="for_mobile">
                    {process.env.NEXT_PUBLIC_VERSION}<br/>
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

export default RegistrationSection