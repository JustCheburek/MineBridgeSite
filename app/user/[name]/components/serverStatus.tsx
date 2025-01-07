import dynamic from "next/dynamic";
import {User} from "lucia";
import {AddWLConsole, GetHours} from "@services/console";

const HourStarSection = dynamic(() => import("./hourstar"));
const WhitelistSection = dynamic(() => import("./whitelist"));

type ServerStatus = {
    user: User
    isMe: boolean
}

export default async function ServerStatusSection({user, isMe}: ServerStatus) {
    const [hours, whitelist] = await Promise.all([
        GetHours(user.name),
        isMe
            ? AddWLConsole(user.name)
            : true
    ])

    return <>
        {hours > -1 &&
          <HourStarSection user={user} hours={hours} isMe={isMe}/>
        }

        <WhitelistSection user={user} isMe={isMe} whitelist={whitelist}/>
    </>
}