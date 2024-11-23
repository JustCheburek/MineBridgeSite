import styles from "./styles/yt.module.scss"
import {Img, ImgBox} from "@components/img";
import Link from "next/link";

const YtSection = () => (
    <section className={`${styles.section} center_text`}>
        <div className={styles.text}>
            <h2 className="unic_color">
                Всё ещё не уверен?
            </h2>
            <h3>
                Тогда посмотри этот {" "}
                <Link href="https://youtu.be/m7ipkVv_FPE" target="_blank">
                    видосик
                </Link>
            </h3>
        </div>

        <Link className={`${styles.yt_link} border`} href="https://youtu.be/m7ipkVv_FPE" target="_blank">
            <ImgBox type="post" borderRadius>
                <Img
                    src="https://i.ytimg.com/vi/m7ipkVv_FPE/maxresdefault.jpg"
                    alt="Ссылка на видео о Майнбридже"
                />
            </ImgBox>
        </Link>
    </section>
)

export default YtSection