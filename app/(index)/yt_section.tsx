import styles from "./styles/yt.module.scss"
import Link from "next/link";
import {YouTubeEmbed} from '@next/third-parties/google'

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

        <div className={styles.yt_link}>
            <YouTubeEmbed videoid="m7ipkVv_FPE" params="controls=0"/>
        </div>
    </section>
)

export default YtSection