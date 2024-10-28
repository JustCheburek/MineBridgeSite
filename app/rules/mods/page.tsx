// React
import type {Metadata} from "next";

// Стили
import styles from './mods.module.scss';

// Компоненты
import {NotFound} from "@components/notFound";
import {OnThisPage, OnThisPageBox, OnThisPageHeading, OnThisPageLink} from "@components/sideNav";
import {ErrorSvg, SuccessSvg} from "@ui/SVGS";
import Link from "next/link";
import {H1} from "@components/h1";

export const metadata: Metadata = {
    title: "Моды",
    description: "Списки разрешённых и запрещённых дополнений. Здесь также есть сборки!",
    openGraph: {
        title: "Моды",
        description: "Списки разрешённых и запрещённых дополнений. Здесь также есть сборки!",
    },
    twitter: {
        title: "Моды",
        description: "Списки разрешённых и запрещённых дополнений. Здесь также есть сборки!",
    }
};

export default function Mods() {
    type Name = { name: string, url?: URL }
    type NameUrl = Required<Name>

    const packs: NameUrl[] = [{
        name: "Сборка модов от Kawa11Fox 1.20.4",
        url: new URL("https://disk.yandex.ru/d/ToOOD2brmUWULA")
    }, {
        name: "Сборка модов от JustCheburek 1.21?",
        url: new URL("https://modrinth.com/modpack/minebridge-pack")
    }]

    const recommendMods: NameUrl[] = [{
        name: "Simple Voice Chat",
        url: new URL("https://modrinth.com/plugin/simple-voice-chat/")
    }, {
        name: "EmoteCraft",
        url: new URL("https://modrinth.com/mod/emotecraft")
    }, {
        name: "Cit Resewn",
        url: new URL("https://modrinth.com/mod/cit-resewn")
    }, {
        name: "RP Renames",
        url: new URL("https://modrinth.com/mod/rp-renames")
    }, {
        name: "No Chat Reports",
        url: new URL("https://modrinth.com/mod/no-chat-reports")
    }]

    const mods: Name[] = [{
        name: "Миникарта"
    }, {
        name: "Моды на оптимизацию"
    }, {
        name: "Отображение информации о мобах, предметах, крафтах, оружии, шалкерах, освещённости"
    }, {
        name: "Litematica (easy place mod)", url: new URL("https://curseforge.com/minecraft/mc-mods/litematica")
    }, {
        name: "FlashBack (только для видео)", url: new URL("https://modrinth.com/mod/flashback")
    }, {
        name: "Bobby", url: new URL("https://modrinth.com/mod/bobby")
    }, {
        name: "InvMove", url: new URL("https://modrinth.com/mod/invmove")
    }, {
        name: "Gamma Utils", url: new URL("https://modrinth.com/mod/gamma-utils")
    }, {
        name: "Freecam (Modrinth Edition)", url: new URL("https://modrinth.com/mod/freecam")
    }]

    const rps: NameUrl[] = [{
        name: "Тотемы Майнбриджа (самоустановка)", url: new URL("https://modrinth.com/resourcepack/minebridge-totems")
    }, {
        name: "Default Dark Mode", url: new URL("https://modrinth.com/resourcepack/default-dark-mode")
    }, {
        name: "3D Redstone Dust",
        url: new URL("https://modrinth.com/resourcepack/redstonetweaksresourcepack/version/1.3_3dDust")
    }]

    const blacklist: string[] = [
        "Модификации, выполняющие действия за игрока (ИИ, принтер и так далее, но автокликер разрешён)",
        "Чит-модификации", "Модификации, позволяющие летать сквозь блоки не выходя с сервера",
        "Aristois", "Baritone", "Better PVP",
        "BetterClicker (используйте обычный автокликер, не использующий окружающую среду)",
        "ClientCommands", "CMDCam", "FreeCam (позволяющий пролетать сквозь стенки)", "Impact", "Inertia", "Jello", "LavaClearView",
        "MultiConnect (используйте только ViaFabric / Forge)",
        "SeedCracker (а также другие моды и программы, выполняющие функции этого мода)", "Sigma", "StepUp", "Tweakeroo",
        "Wall-Jump", "Wurst", "Xray"
    ]

    return (<>
        <div className="mods_content">
            <H1 up>Моды</H1>

            <section id="allowed_mods" className={styles.list_container}>
                <div className={`${styles.list_text} center_text`}>
                    <h2 className="green_color success_box">
                        <SuccessSvg/>
                        Разрешено
                    </h2>
                    <h3>Моды</h3>
                </div>
                <h4>
                    Сборки:
                </h4>
                <ul className={styles.list}>
                    {packs.map(pack => (
                        <li key={pack.name} className={styles.item}>
                            <Link href={pack.url.toString()} target="_blank">
                                {pack.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <br/>
                <h4>
                    Очень рекомендуемые моды:
                </h4>
                <ul className={styles.list}>
                    {recommendMods.map(mod => (
                            <li key={mod.name} className={styles.item}>
                                <Link href={mod.url.toString()} target="_blank">
                                    {mod.name}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
                <br/>
                <h4>
                    Разрешённые моды, которые могут попасть под сомнение:
                </h4>
                <ul className={styles.list}>
                    {mods.map(mod => (
                            <li key={mod.name} className={styles.item}>
                                {mod?.url ?
                                    <Link href={mod.url.toString()} target="_blank">
                                        {mod.name}
                                    </Link>
                                    : <p>{mod.name}</p>
                                }
                            </li>
                        )
                    )}
                </ul>
            </section>

            <section id="allowed_rps" className={styles.list_container}>
                <h3 className={`${styles.list_text} center_text`}>
                    Ресурспаки
                </h3>
                <p>
                    При входе на сервер ресурспаки устанавливаются сами
                </p>
                <p>
                    Разрешены все ресурспаки, которых нет в списке {`"`}запрещено{`"`}
                </p>
                <h4>
                    Рекомендуемые:
                </h4>
                <ul className={styles.list}>
                    {rps.map(rp => (
                        <li key={rp.name} className={styles.item}>
                            <Link href={rp.url.toString()} target="_blank">
                                {rp.name}
                            </Link>
                        </li>)
                    )}
                </ul>
            </section>

            <section id="forbidden" className={styles.list_container}>
                <h2 className={`${styles.list_text} error_box center_text red_color`}>
                    <ErrorSvg/>
                    Запрещено
                </h2>

                <ul className={`${styles.list} no_select`}>
                    {blacklist.map(mod => {
                        return (
                            <li key={mod} className={styles.item}>
                                {mod}
                            </li>
                        )
                    })}
                </ul>
            </section>

            <NotFound buttonText="Тех поддержка" href="https://discord.gg/f95V9Rezqy">
                Если вы всё равно не нашли мод, обратитесь в техподдержку и вам сообщат, можно ли использовать его!
            </NotFound>
        </div>

        <OnThisPage>
            <OnThisPageHeading>
                Содержание
            </OnThisPageHeading>
            <OnThisPageLink href="#allowed">
                Разрешено
            </OnThisPageLink>
            <OnThisPageBox>
                <OnThisPageLink href="#allowed_mods">
                    Моды
                </OnThisPageLink>
                <OnThisPageLink href="#allowed_rps">
                    Ресурспаки
                </OnThisPageLink>
            </OnThisPageBox>
            <OnThisPageLink href="#forbidden">
                Запрещено
            </OnThisPageLink>
        </OnThisPage>
    </>)
}