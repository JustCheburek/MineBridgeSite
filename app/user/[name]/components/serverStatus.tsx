import dynamic from "next/dynamic";
import {User} from "lucia";
import {AddWLConsole, GetHours} from "@services/console";

const HourStarSection = dynamic(() => import("./hourstar"));
const WhitelistSection = dynamic(() => import("./whitelist"));

type ServerStatus = {
    user: User
    isMe: boolean
    access: boolean
}

export default async function ServerStatusSection({user, isMe, access}: ServerStatus) {
    const [hours, whitelist] = await Promise.all([
        GetHours(user.name),
        AddWLConsole(user.name)
    ])

    return <>
        {hours > -1 &&
          <HourStarSection user={user} hours={hours}/>
        }

        <WhitelistSection user={user} isMe={isMe} access={access} whitelist={whitelist}/>
    </>
}