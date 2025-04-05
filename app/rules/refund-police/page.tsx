import {H1} from "@components/h1";
import type {Metadata} from "next";
import {LASTREFUNDPOLICEUPDATE} from "@/const";
import {LastUpdate} from "@components/lastUpdate";
import {Rule, RulesBox} from "@components/rules";
import {OnThisPage, OnThisPageLink} from "@components/sideNav";
import {Number} from "@components/number";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Политика возврата средств",
    description: "Политика отказа от услуг и возврата средств."
};

export default function RefundPolice() {
    return (<>
        <div className="refund_content">
            <H1 up>
                Возврат
            </H1>
            <LastUpdate time={LASTREFUNDPOLICEUPDATE}/>
            <br/>
            <p>
                Политика отказа от услуг и возврата средств компании «MineBridge (Майнбридж)»
            </p>
            <RulesBox name="terms" heading="Термины" number={0}>
                <p>
                    Термины используются в том же значении, что и в{" "}
                    <Link
                        href="/rules/terms-of-use"
                        className="unic_color medium-font"
                    >
                        пользовательском соглашении
                    </Link>.
                </p>
            </RulesBox>
            <RulesBox name="properly" heading="Отказ от услуги надлежащего качества по желанию Пользователя" number={1}>
                <Rule number={1.1}>
                    <em>
                        Отказ от услуги, которая удовлетворяет качеству, соответствует заявленным характеристикам, но от
                        нее пользователь может отказаться по субъективным причинам.
                    </em>
                </Rule>
                <Rule number={1.2}>
                    <h3>
                        Баланс
                    </h3>
                    <p>
                        Пользователь может запросить возврат в течение 24 часов после пополнения, если баланс не менялся
                        после пополнения.
                    </p>
                </Rule>
                <Rule number={1.3}>
                    <h3>
                        Услуги декорации
                    </h3>
                    <em>
                        Питомцы, частицы и другие украшения, отображаемые на игровом сервере
                    </em>
                    <p>
                        Возврат не осуществляется.
                    </p>
                </Rule>
                <Rule number={1.4}>
                    <h3>
                        Другие услуги
                    </h3>
                    <p>
                        Возврат за другие услуги рассматривается в индивидуальном порядке.
                    </p>
                </Rule>
            </RulesBox>
        </div>
        <OnThisPage>
            <OnThisPageLink href="#terms">
                <Number>0</Number>
                Термины
            </OnThisPageLink>
        </OnThisPage>
    </>)
}