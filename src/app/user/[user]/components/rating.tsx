// React
import {useState} from "react";
import {Link, useParams} from "react-router-dom";

// Utils
import {colorText} from "@app/utils";

// Hooks
import {useCreateUserPunishment, useGetUser} from "../../../hooks/userQueries";

// Компоненты
import {Add, FormButton, FormLabel} from "@components/form";
import {Modal} from "@components/modal";
import {useForm} from "react-hook-form";

export function Rating() {
    const {name} = useParams()
    const [ratingModal, setRatingModal] = useState(false)

    const {
        data: {user, author}
    } = useGetUser(name)
    const {
        mutate, isLoading
    } = useCreateUserPunishment(name)

    const {
        register,
        handleSubmit
    } = useForm({defaultValues: {"author": author.name}})

    async function ChangeRating(data) {
        mutate(data)
        setRatingModal(false)
    }

    return (<>
        <h4 className="user_info">
            Соц рейтинг: {" "}
            <strong className={colorText(user.rating)}>
                {user.rating}
            </strong> {" "}
            {!author.isModer
                ? <Link href="/rules" className="add">+</Link>
                : <Add setModal={setRatingModal}/>
            }
        </h4>
        {author.isModer &&
            <Modal setModal={setRatingModal} modal={ratingModal}>
                <h1>Рейтинг</h1>
                <p>Значение суммируется</p>
                <form
                    className="form"
                    onSubmit={handleSubmit(ChangeRating)}
                >
                    <FormLabel>
                        <input
                            type="text"
                            placeholder="Причина"
                            autoComplete="reason"
                            required
                            maxLength={26}
                            disabled={isLoading}
                            {...register("reason")}
                        />
                    </FormLabel>
                    <FormLabel>
                        <input
                            type="number"
                            placeholder="Рейтинг"
                            autoComplete="rating"
                            required
                            disabled={isLoading}
                            {...register("rating", {valueAsNumber: true})}
                        />
                    </FormLabel>
                    <FormLabel>
                        <input
                            type="text"
                            placeholder="Автор"
                            autoComplete="author"
                            required
                            disabled={isLoading}
                            {...register("author")}
                        />
                    </FormLabel>
                    <FormButton disabled={isLoading}>
                        Добавить
                    </FormButton>
                </form>
            </Modal>
        }
    </>)
}