import {User} from "lucia";
import {GetStarsForm} from "./getStars";
import {GetHours} from "@services/console";

export default async function HourStarSection({user}: { user: User }) {
    const hours = await GetHours(user.name)

    return (
        <section className="center_text grid_center">
            <h2>
                Часы: {hours}
            </h2>
            {hours === -1 &&
              <p>
                Сервер не доступен
              </p>
            }
            {hours > 0 &&
              <GetStarsForm _id={user._id} name={user.name}/>
            }
        </section>
    )
}