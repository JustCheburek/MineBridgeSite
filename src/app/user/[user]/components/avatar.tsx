import {useParams} from "react-router-dom";
import {useGetUser} from "../../../hooks/userQueries";

export function Avatar() {
    const {name} = useParams()
    const {data: {user}} = useGetUser(name)

    return (
        <img src={user.photo} alt="Ава" className="user_icon"/>
    )
}