import {DiscordUrl, SupportUrl, TelegramUrl, VkUrl} from "@ui/SVGS";

export function Urls({className}: { className?: string }) {
	return (
			<ul className={`remove_marker no_select not_indent ${className}`}>
				{/* Навигация по ссылкам */}
				<li className="url">
					<TelegramUrl/>
				</li>
				<li className="url">
					<DiscordUrl/>
				</li>
				<li className="url">
					<VkUrl/>
				</li>
				<li className="url">
					<SupportUrl/>
				</li>
			</ul>
	)
}