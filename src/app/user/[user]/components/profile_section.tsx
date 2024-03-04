// Компоненты
import {Name} from "./name"
import {Avatar} from "./avatar";
import {Mostiki} from "./mostiki";
import {Rating} from "./rating";

export function ProfileSection() {
	return (
			<>
				<div className="user_container">
					<Avatar/>

					<div className="text">
						<Name/>
						<Mostiki/>
						<Rating/>
					</div>
				</div>
			</>
	)
}