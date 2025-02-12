"use server";
import {User} from "lucia";
import {Url} from "@components/button";
import {GetStarsForm} from "@app/user/[name]/components/getStars";

export default async function HourStarSection({user, hours, isMe}: { user: User, hours: number, isMe: boolean }) {
    return (
        <section className="center_text grid_center">
            <h2>
                Часы: {hours}
            </h2>
            <small>
                Максимум без получения на сайте: 24
            </small>
            {hours === 0 &&
              <Url href={`/user/${user.name}/history`}>
                Посмотреть звёзды
              </Url>
            }
            {isMe && hours > 0 &&
              <GetStarsForm _id={user._id}/>
            }
        </section>
    )
}