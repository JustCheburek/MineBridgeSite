// React
import type {Metadata} from "next";

// Стили
// Компоненты
import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import {PBox, PText, PTitle} from "@components/post";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Регистрация",
    description: "Регистрация на сервере с помощью Java + Bedrock Edition. Как войти с компьютера и телефона?"
};

export default function Bedrock() {
    return (
        <MaxSize>
            <H1 paths={[
                {name: "features", displayname: "Фичи"},
                {name: "guides", displayname: "Гайды"},
                {name: "auth", displayname: "Регистрация"}
            ]}>
                Регистрация
            </H1>

            <PBox>
                <PTitle>
                    <h2>Только Java/Bedrock</h2>
                </PTitle>
                <PText>
                    <ul>
                        <li>
                            Регистрируйте аккаунт на сайте, используя свой ник из майнкрафта
                        </li>
                        <li>
                            Попадаете в вайтлист <small>(процесс автоматический)</small>
                        </li>
                        <li>
                            Копируйте айпи и входите на сервер
                        </li>
                    </ul>
                </PText>
            </PBox>

            <PBox>
                <PTitle>
                    <h2>Java + Bedrock</h2>
                </PTitle>
                <PText>
                    <h3>
                        Bedrock:
                    </h3>
                    <ul>
                        <li>
                            Добавляем сервер во вкладке сервера:<br/>
                            IP: link.geysermc.org<br/>
                            Порт не трогаем
                        </li>
                        <li>
                            Заходим и прописываем /linkaccount
                        </li>
                        <li>
                            В чат прилетело сообщение Please join on Java and run /linkaccount и код
                        </li>
                        <li>
                            Запоминаем код и выходим с сервера
                        </li>
                    </ul>
                    <br/>
                    <h3>
                        Java:
                    </h3>
                    <ul>
                        <li>
                            Создаём сервер<br/>
                            IP: link.geysermc.org<br/>
                            Порт не трогаем
                        </li>
                        <li>
                            Заходим и прописываем /linkaccount [код, который вы запомнили]
                        </li>
                        <li>
                            Выходим
                        </li>
                    </ul>
                    <br/>
                    <p>
                        Вы успешно связали аккаунты, теперь вы можете заходить как с телефона, так и с компа
                    </p>
                    <p>
                        Айпи можно взять в <Link href="/auth" className="unic_color">профиле</Link> на сайте
                    </p>
                </PText>
            </PBox>
        </MaxSize>
    )
}