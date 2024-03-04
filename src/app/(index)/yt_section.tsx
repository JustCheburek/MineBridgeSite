import styles from "./styles/yt.module.scss"
import {Img, ImgBox} from "@components/img";

export function YtSection() {
	return (
			<section className={`${styles.section} center_text`}>
				<div className={styles.text}>
					<h2 className="unic_color">
						Всё ещё не уверены?
					</h2>
					<h3>
						Тогда посмотрите этот {" "}
						<a href={`https://www.youtube.com/watch?v=tZPDLuddfVs`} target="_blank" rel="noopener noreferrer">
							видосик
						</a>
					</h3>
				</div>

				<a className="border" href="https://www.youtube.com/watch?v=tZPDLuddfVs" target="_blank" rel="noopener noreferrer">
					<ImgBox type="post">
						{/* https://i.ytimg.com/vi/{id}/maxresdefault.jpg */}
						<Img
								src="/media/index/yt/preview.jpg"
								alt="Ссылка на видео о Майнбридже"
								width={700}
								height={394}
						/>
					</ImgBox>
				</a>
			</section>
	)
}