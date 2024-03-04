// React
import type {Metadata} from "next";

// Стили
import "./styles/streamers.scss"

// Компоненты
import {Box, Twitch, YT} from "./components";
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";

export const metadata: Metadata = {
    title: "Контент мейкеры | Майнбридж",
    description: "Очень креативные игроки!",
};

export default function Streamers() {
    return (
        <main className="streamers">
            <MaxSize>
                <RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "streamers", displayname: "Контент мейкеры"}]}/>
                <h1>Контент мейкеры</h1>

                <p className="center_text"><small>(будет переработка страницы)</small></p>

                <div className="container">
                    <Box name="justcheburek">
                        <YT name="JustCheburek"/>
                        <Twitch name="justcheburek"/>
                    </Box>

                    <Box name="kawa11fox">
                        <YT name="Kawa11Fox"/>
                        <Twitch name="kawa11fox"/>
                    </Box>

                    <Box name="rkrmv">
                        <Twitch name="rkrmv"/>
                    </Box>

                    <Box name="vebrau">
                        <YT name="Vebray_"/>
                    </Box>

                    <Box name="toxser">
                        <YT name="TOXwyr"/>
                    </Box>
                </div>
            </MaxSize>
        </main>
    )
}