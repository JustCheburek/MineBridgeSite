import {H1} from "@components/h1";
import {MaxSize} from "@components/maxSize";
import {validate} from "@services/validate";
import {FormLink} from "@components/formBox";
import styles from "./milkyway.module.scss"
import {StarSvg, TriangleSvg} from "@ui/SVGS";

export default async function MilkyWay() {
    const {user: author} = await validate()

    if (!author) {
        return (
            <MaxSize className="center_text">
                <H1>Млечный путь</H1>

                <FormLink href="/auth">
                    Сначала зарегистрируйся
                </FormLink>
            </MaxSize>
        )
    }

    return (
        <MaxSize className="center_text">
            <H1>
                Млечный путь
            </H1>

            <div className={styles.progress_box}>
                <progress
                    value={150}
                    max={300}
                    className={styles.progress}
                />

                <div className={styles.rating_box}>
                    <TriangleSvg className={styles.triangle} size="1.2em"/>
                    <span className={styles.line}/>

                    <h3 className={styles.rating}>
                        {author.rating} <StarSvg/>
                    </h3>
                </div>
            </div>
        </MaxSize>
    )
}