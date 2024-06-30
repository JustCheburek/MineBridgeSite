import {Form, FormButton, FormInput, FormLabel} from "@components/form";
import {MaxSize} from "@components/maxSize";

export function BuyForm({Buy}: {Buy: (formData: FormData) => Promise<void>}) {
	return (
			<MaxSize width={550} className="center_text">
				<h1>
					Покупка мостиков
				</h1>
				<p className="red_color">
					СИСТЕМА В РАЗРАБОТКЕ
				</p>
				<Form action={Buy}>
					<FormLabel>
						<FormInput
								type="number"
								name="total"
								autoComplete="mostiki"
								placeholder="Количество"
								required
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="coupon"
								autoComplete="coupon"
								placeholder="Купон"
						/>
					</FormLabel>
					<FormButton>
						Купить
					</FormButton>
				</Form>
			</MaxSize>
	)
}