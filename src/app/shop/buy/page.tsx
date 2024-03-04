// React
import {Link, Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";

// Хуки
import {useMe} from "../../hooks/userQueries";

// Компоненты
import {Loading} from "@components/loading";
import {MostikiSvg, SBPSvg} from "@ui/svgs";

export function Component() {
    const {isLoading, isError} = useMe()

    if (isLoading) {
        return <Loading/>
    }

    if (isError) {
        return <Navigate to="/auth"/>
    }

    return (
        <main className="center_text">
            <MaxSize width={550}>
                <Helmet>
                    <title>Покупка | Майнбридж</title>
                    <meta
                        charSet="UTF-8"
                        content="Покупка мостиков с помощью СБП. 1₽ = 1 мостик. Подержите нас донатиков, пж!"
                        name="description"
                    />
                </Helmet>

                <h1>
                    Покупка
                </h1>
                <p>
                    Покупка происходит с помощью {" "}
                    <Link
                        to="#sbp"
                    >
                        <strong className="unic_color">СБП</strong>
                    </Link>
                    <br/>
                    или напрямую по {" "}
                    <Link
                        to="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
                        target="_blank"
                    >
                        <strong className="unic_color">СБЕР</strong>
                    </Link>
                </p>
                <h3>
                    1 ₽ = 1 <MostikiSvg/>
                </h3>
                <br/>
                <div id="sbp" className="green_color">
                    <h4 className="all_select">
                        СберБанк
                    </h4>
                    <h4 className="all_select">
                        8 914 344 8578
                    </h4>
                </div>
                <a
                    href="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{marginBlock: "20px"}}
                >
                    <SBPSvg/>
                </a>
            </MaxSize>
        </main>
    )
}
