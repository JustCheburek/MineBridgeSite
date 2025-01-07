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
        AddWLConsole(user.name)
    ])

    return <>
        {hours > -1 &&
          <HourStarSection user={user} hours={hours}/>
        }

        {whitelist
            ? <WhitelistSection user={user} isMe={isMe}/>
            : <section className="center_text">
                <h2>
                    Сервер не доступен
                </h2>
                <p>
                    Попробуй зайти на сайт позже
                </p>
                {isMe &&
                    <p>
                      чтобы попасть в Whitelist
                    </p>
                }
            </section>
        }
    </>
}