import type {Role} from "@/types/role";

// Стили
import styles from "../profile.module.scss"

export function Roles({roles}: { roles?: Role[] }) {
	if (!roles) return

	return (
			<div className={styles.roles}>
				{roles.map(role => (
						<small key={role.id}>
							{role.name}
						</small>
				))}
			</div>
	)
}