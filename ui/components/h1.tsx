import {ReloadButton} from "@components/reload";
import styles from "./styles/h1.module.scss"
import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import {UpSvg} from "@ui/SVGS";
import Link from "next/link";

interface RelativePath {
    name: string
    displayname: string
    hide?: boolean
}

const RelativeNav = ({paths}: { paths: RelativePath[] }) => (
    <nav className="center_text">
        {paths.map((path, index) => {
            if (path.hide) {
                return null
            }
            const current = index + 1
            const last = current === paths.length

            if (last) {
                return <span key={index}>{path.displayname}</span>
            }

            const absolutePath = `/${paths.slice(0, current).map(p => p.name).join("/")}`

            return (
                <span key={index}>
                    <Link href={absolutePath}>{path.displayname}</Link>
                    <span className={styles.nav_arrow}> {">"} </span>
                </span>
            )
        })}
    </nav>
)

interface H1Props extends ComponentPropsWithoutRef<"h1"> {
    reload?: () => void
    up?: boolean
    paths?: RelativePath[]
    description?: string
}

export const H1 = ({children, paths, reload, description, up = false, className = "", ...props}: PropsWithChildren<H1Props>) => (
    <div className={`${styles.container} ${className}`}>
        {paths && <RelativeNav paths={paths}/>}

        <div className={styles.box} id="top">
            {up
                ? <Link href={"#top"} className={`unic_button ${styles.top}`} title="Наверх">
                    <UpSvg
                        size="4.5rem"
                        className="unic_color"
                    />
                </Link>
                : <div/>
            }

            <div>
                <h1 className={styles.h1} {...props}>
                    {children}
                </h1>

                {description &&
                  <p>
                      {description}
                  </p>
                }
            </div>

            {reload &&
              <ReloadButton action={reload} className={styles.reload}/>
            }
        </div>
    </div>
)