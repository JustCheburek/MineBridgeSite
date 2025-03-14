import type {User} from "lucia";

export default function TwitchFrame({user}: { user: User }) {
    const twitchName = user?.socials?.find(({social}) => social === "twitch")?.name
    if (!twitchName) return

    return (
        <iframe
            src={`https://player.twitch.tv/?channel=${twitchName}&parent=${process.env.NEXT_PUBLIC_RU_DOMAIN}`}
            allowFullScreen
            frameBorder={0}
        />
    )
}