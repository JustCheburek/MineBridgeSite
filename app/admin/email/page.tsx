import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import {SendEmailForm} from "@app/admin/email/components";

export default async function AdminPanel() {
    return (
        <MaxSize className="center_text grid_center">
            <H1>Почта</H1>

            <h3>Отправить письмо</h3>
            <SendEmailForm/>
        </MaxSize>
    )
}