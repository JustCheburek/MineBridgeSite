import type {Role} from "@src/types/role";

// Стили
import styles from "../profile.module.scss"

export function Roles({roles}: { roles?: Role[] }) {
	if (!roles) return

	return (
			<div className={styles.roles}>
				{roles.map(role => (
						<small>
							{role.name}
						</small>
				))}
			</div>
	)
}