// React
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form"
import Cookies from 'js-cookie';

// Hooks
import {useAuth, useMe} from "../../hooks/userQueries";

// Стили
import './styles/auth.scss';

// Svgs
import {DiscordSvg, GoogleSvg} from "@ui/svgs";
import {FormButton, FormGroup, FormLabel} from "@components/form";
import {MaxSize} from "@components/maxSize";

export function Component() {
    const {
        register,
        handleSubmit
    } = useForm({defaultValues: {"name": Cookies.get("name") || ""}})

    const {
        data,
        isSuccess
    } = useMe()
    const {
        mutate,
        isLoading,
        error,
        isError
    } = useAuth()

    if (isSuccess) {
        return <Navigate to={`/user/${data.user.name}`}/>
    }

    return (
        <main className="auth">
            <MaxSize className="center_text grid_center">
                <Helmet>
                    <title>Регистрация | Майнбридж</title>
                    <meta
                        charSet="UTF-8"
                        content="Нужен лишь гугл или дискорд и вы уже на сервере!"
                        name="description"
                    />
                </Helmet>

                <h1>Вход</h1>
                <p>
                    Вы уже близко к цели!
                </p>

                <form className="form" onSubmit={handleSubmit(mutate)}>
                    <FormLabel>
                        <input
                            type="text"
                            placeholder="Майнкрафт никнейм"
                            name="name"
                            autoComplete="nickname"
                            required
                            minLength="4"
                            maxLength="20"
                            disabled={isLoading}
                            {...register("name")}
                        />
                    </FormLabel>

                    <FormGroup>
                        <FormLabel>
                            <input
                                type="radio"
                                name="provider"
                                autoComplete="provider"
                                defaultChecked
                                value="discord"
                                disabled={isLoading}
                                {...register("provider")}
                            />
                            <DiscordSvg className="color" width="1em" height="1em"/>
                        </FormLabel>

                        <FormLabel>
                            <input
                                type="radio"
                                name="provider"
                                autoComplete="provider"
                                value="google"
                                disabled={isLoading}
                                {...register("provider")}
                            />
                            <GoogleSvg width="1em" height="1em"/>
                        </FormLabel>
                    </FormGroup>

                    <FormButton disabled={isLoading}>
                        Погнали
                    </FormButton>
                </form>
                {isError &&
                    <p className="red_color" role="alert">
                        <strong>Ошибка</strong>: {JSON.stringify(error?.message)}
                    </p>
                }
            </MaxSize>
        </main>
    )
}
