import {User} from "lucia";
import {GetHours} from "@services/console";
// import {Button} from "@components/button";

export async function HourStarSection({user}: { user: User }) {
    const hours = await GetHours(user.name)

    if (!hours) return

    console.log(`hours: ${hours}`)

    return (
        <section className="center_text grid_center">
            <h2>
                Часы: {hours}
            </h2>

            {/*{hours > 0 &&
              <Button>
                Получить звёзды
              </Button>
            }*/}
        </section>
    )
}