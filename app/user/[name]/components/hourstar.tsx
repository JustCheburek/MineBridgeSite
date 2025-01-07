import {User} from "lucia";
import {GetStarsForm} from "./getStars";
import {Url} from "@components/button";

export default function HourStarSection({user, hours}: { user: User, hours: number }) {
    return (
        <section className="center_text grid_center">
            <h2>
                Часы: {hours}
            </h2>
            <small>
                Максимум: 24
            </small>
            {hours === 0 &&
              <Url href={`/user/${user.name}/history`}>
                Посмотреть рейтинг
              </Url>
            }
            {hours > 0 &&
              <GetStarsForm _id={user._id}/>
            }
        </section>
    )
}