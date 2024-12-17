import {User} from "lucia";
import {GetHours} from "@services/console";
import {HourStarForm} from "./hourstarForm";

export async function HourStarSection({user}: { user: User }) {
    const hours = await GetHours(user.name)

    console.log(`hours: ${hours}`)

    if (!hours) {
        return (
            <section className="center_text grid_center">
                <h2>
                    Часы: ?
                </h2>
                <p>
                    Сервер не доступен
                </p>
                <p className="red_color medium-font">
                    В бета тесте
                </p>
            </section>
        )
    }

    return (
        <section className="center_text grid_center">
            <h2>
                Часы: {hours}
            </h2>

            {hours > 0 &&
                <HourStarForm _id={user.name} name={user.name} hours={hours}/>
            }

            <p className="red_color medium-font">
                В бета тесте
            </p>
        </section>
    )
}