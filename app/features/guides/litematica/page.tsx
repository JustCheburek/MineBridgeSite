// React
import type {Metadata} from "next";

// Компоненты
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";

export const metadata: Metadata = {
	title: "Litematica | Майнбридж",
	description: "Здесь можно быстро и понятно влится в лайтматику!",
};

export default function Litematica() {
	return (
			<MaxSize className="center_text">
				<RelativeNav
						paths={[
							{name: "features", displayname: "Фичи"},
							{name: "guides",displayname: "Гайды"},
							{name: "Litematica", displayname: "Litematica"}
						]}
				/>
				<h1>Litematica</h1>
				<p>
					Гайда нет, но вы держитесь
				</p>
				<p>
					Пожалуйста, напишите здесь гайд и скиньте в лс
				</p>
				{/*
                <div className="container" id="litematica">
                    <h2 className="heading">Лайтматика</h2>

                    <div className="description">
                        <h3>
                            Установка
                        </h3>
                        <a href="https://www.curseforge.com/minecraft/mc-mods/litematica">
                            Скачиваем Litematica, закидываем в папку .minecraft/mods, запускаем майн
                        </a>
                        <h3>
                            Создание схемы
                        </h3>
                        <p>

                        </p>
                        <h3>
                            Размещение
                        </h3>
                    </div>
                </div>*/}
			</MaxSize>
	)
}