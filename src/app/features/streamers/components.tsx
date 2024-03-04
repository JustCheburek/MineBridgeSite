import {TwitchSvg, YtSvg} from "@ui/svgs";

export function Box(
    {
        name,
        children
    }) {
    return (
        <div className="box">
            <img
                src={`/media/features/streamers/${name}.png`}
                alt="Контент-мейкер"
                className="img_box"
                loading="lazy"
            />

            <ul className="remove_marker social not_indent">
                {children}
            </ul>
        </div>
    )
}

export function YT({name}) {
    return (
        <li>
            {/* Ютуб */}
            <a href={`https://www.youtube.com/@${name}`} target="_blank" rel="noreferrer noopener">
                <YtSvg/>
            </a>
        </li>
    )
}

export function Twitch({name}) {
    return (
        <li>
            {/* Твич */}
            <a href={`https://www.twitch.tv/${name}`} target="_blank" rel="noreferrer noopener">
                <TwitchSvg/>
            </a>
        </li>
    )
}