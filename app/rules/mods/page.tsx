// React
import type {Metadata} from "next";

// Стили
import styles from './mods.module.scss';

// Компоненты
import {NotFound} from "@components/notFound";
import {OnThisPage, OnThisPageBox, OnThisPageItem} from "@components/sideNav";
import {ErrorSvg, SuccessSvg} from "@ui/svgs";

export const metadata: Metadata = {
	title: "Моды | Майнбридж",
	description: "Списки разрешённых и запрещённых дополнений. Здесь также есть сборки!",
};

export default function Mods() {
	type Item = { name: string, url?: string }

	const mods: Item[] = [{
		name: "Сборка модов от Kawa11Fox 1.20.2",
		url: "https://disk.yandex.ru/d/ToOOD2brmUWULA"
	}, {
		name: "Миникарта"
	}, {
		name: "Моды на оптимизацию"
	}, {
		name: "Отображение информации о мобах, предметах, крафтах, оружии, шалкерах, освещённости"
	}, {
		name: "Любые виды zoom"
	}, {
		name: "EmoteCraft (рекомендуется)", url: "https://modrinth.com/mod/emotecraft"
	}, {
		name: "Simple Voice Chat (рекомендуется)",
		url: "https://modrinth.com/plugin/simple-voice-chat/versions?l=quilt&l=forge&l=fabric"
	}, {
		name: "Litematica (easy place mod)", url: "https://curseforge.com/minecraft/mc-mods/litematica"
	}, {
		name: "Replay Mod (только для видео)", url: "https://replaymod.com/download/"
	}, {
		name: "Bobby", url: "https://modrinth.com/mod/bobby"
	}, {
		name: "Gamma Utils", url: "https://modrinth.com/mod/gamma-utils"
	}]

	const rps: Item[] = [{
		name: "Тотемы Майнбриджа", url: "/download/MineBridge_Totems.zip"
	}, {
		name: "Default Dark Mode", url: "https://modrinth.com/resourcepack/default-dark-mode"
	}, {
		name: "3D Redstone Dust",
		url: "https://modrinth.com/resourcepack/redstonetweaksresourcepack/version/1.3_3dDust"
	}]

	const blacklist: string[] = [
		"Модификации, выполняющие действия за игрока (ИИ, принтер и так далее, но автокликер разрешён)",
		"Чит-модификации", "Модификации, позволяющие летать сквозь блоки не выходя с сервера",
		"Aristois", "Baritone", "Better PVP",
		"BetterClicker (используйте обычный автокликер, не использующий окружающую среду)",
		"ClientCommands", "CMDCam", "FindMe", "FreeCam", "Impact", "Inertia", "InvMove", "Jello", "LavaClearView",
		"MultiConnect (используйте только ViaFabric / Forge)", "NoFog (используйте Sodium Extra или OptiFine)",
		"SeedCracker (а также другие моды и программы, выполняющие функции этого мода)", "Sigma", "Tweakeroo",
		"Wall-Jump", "Wurst", "Xray"
	]

	return (
				<>
					<div className="mods_content">
						<h1>Моды</h1>

						<section id="allowed_mods" className={styles.list_container}>
							<div className={`${styles.list_text} center_text`}>
								<h2 className="green_color success_box">
									<SuccessSvg/>
									Разрешено
								</h2>
								<h3>Моды</h3>
							</div>
							<ul className={styles.list}>
								{mods.map(mod => (
												<li key={mod.name} className={styles.item}>
													{mod?.url ?
															<a href={mod.url} target="_blank" rel="noopener noreferrer">
																{mod.name}
															</a>
															:
															<p>{mod.name}</p>
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
								Разрешены все ресурспаки, которых нет в списке {`"`}запрещено{`"`}
							</p>
							<p>
								Рекомендуемые:
							</p>
							<ul className={styles.list}>
								{rps.map(rp => (
										<li key={rp.name} className={styles.item}>
											<a href={rp.url} target="_blank" rel="noopener noreferrer">
												{rp.name}
											</a>
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
						<OnThisPageItem>
							Содержание
						</OnThisPageItem>
						<OnThisPageItem href="#allowed">
							Разрешено
						</OnThisPageItem>
						<OnThisPageBox>
							<OnThisPageItem href="#allowed_mods">
								Моды
							</OnThisPageItem>
							<OnThisPageItem href="#allowed_rps">
								Ресурспаки
							</OnThisPageItem>
						</OnThisPageBox>
						<OnThisPageItem href="#forbidden">
							Запрещено
						</OnThisPageItem>
					</OnThisPage>
				</>
			)
}