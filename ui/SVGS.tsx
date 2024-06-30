import {DS_URL, SUPPORT_URL, TG_URL, VK_URL} from "@/const";
import "./styles/state.scss";
import Link from "next/link";

type Svg = {
	className?: string
	width?: string
	height?: string
}

export const MostikiSvg = ({className = "", width = "1.1em", height = "0.85em"}: Svg) => (
		<svg
				style={{width, height}} viewBox="0 0 95 67" xmlns="http://www.w3.org/2000/svg"
				className={`unic_color ${className}`}
		>
			<path d="M95 62.7398V66.9999H74.1854V62.7398H95Z" fill="currentColor"/>
			<path d="M95 43.0371V51.0247L0 51.0247L3.49937e-07 43.0371L95 43.0371Z" fill="currentColor"/>
			<path d="M30.4213 66.9999V62.7398H3.49937e-07V66.9999H30.4213Z" fill="currentColor"/>
			<path d="M95 66.9999V62.7398H74.1854H64.5787V66.9999H74.1854H95Z" fill="currentColor"/>
			<path
					d="M94.698 62.8784V67H74.0435V14.6652L50.6031 61.1531H44.2626L20.9182 14.6652V67H0.263727V62.8784H9.58227V0H27.2587L47.5289 42.0787L67.7991 0H85.3795V62.8784H94.698Z"
					fill="currentColor"/>
		</svg>
)

export const MinebridgeSvg = ({className = "", width, height}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 192 192"
				className={className} style={{width, height}}
		>
			<path
					fill="#33adb4"
					d="M3.66 100.57h74.97c2.02 0 3.66-1.64 3.66-3.66V76.8c0-2.02-1.64-3.66-3.66-3.66H58.51c-2.02 0-3.66-1.64-3.66-3.66V49.37c0-2.02-1.64-3.66-3.66-3.66h-20.1c-2.02 0-3.66-1.64-3.66-3.66V21.94c0-2.02-1.64-3.66-3.66-3.66H3.66C1.64 18.29 0 19.92 0 21.94v74.97c0 2.02 1.64 3.66 3.66 3.66zM188.34 18.29h-20.11c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02-1.64 3.66-3.66 3.66H140.8c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02-1.64 3.66-3.66 3.66h-20.11c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66h74.97c2.02 0 3.66-1.64 3.66-3.66V21.94c0-2.02-1.64-3.65-3.66-3.65zM23.77 146.29H3.66c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66h20.11c2.02 0 3.66-1.64 3.66-3.66v-20.11c0-2.03-1.64-3.66-3.66-3.66zM188.34 109.71H3.66c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66H188.35c2.02 0 3.66-1.64 3.66-3.66v-20.11a3.677 3.677 0 0 0-3.67-3.66zM188.34 146.29h-20.11c-2.02 0-3.66 1.64-3.66 3.66v20.11c0 2.02 1.64 3.66 3.66 3.66h20.11c2.02 0 3.66-1.64 3.66-3.66v-20.11c0-2.03-1.64-3.66-3.66-3.66z"
			/>
		</svg>
)

export const TelegramUrl = () => (
		<Link target="_blank" href={TG_URL} title="Телеграм">
			<TelegramSvg/>
		</Link>
)

export const TelegramSvg = ({className = "", width = "38px", height = "38px"}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
				className={`url tg ${className}`} fill="currentColor" style={{width, height}}
		>
			<path
					className="color"
					d="M5.83,23.616c12.568-5.529,28.832-12.27,31.077-13.203c5.889-2.442,7.696-1.974,6.795,3.434 c-0.647,3.887-2.514,16.756-4.002,24.766c-0.883,4.75-2.864,5.313-5.979,3.258c-1.498-0.989-9.059-5.989-10.7-7.163 c-1.498-1.07-3.564-2.357-0.973-4.892c0.922-0.903,6.966-6.674,11.675-11.166c0.617-0.59-0.158-1.559-0.87-1.086 c-6.347,4.209-15.147,10.051-16.267,10.812c-1.692,1.149-3.317,1.676-6.234,0.838c-2.204-0.633-4.357-1.388-5.195-1.676 C1.93,26.43,2.696,24.995,5.83,23.616z"
			/>
		</svg>
)

export const DiscordUrl = () => (
		<Link target="_blank" href={DS_URL} title="Дискорд">
			<DiscordSvg/>
		</Link>
)

export const DiscordSvg = ({className = "", width = "38px", height = "38px"}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
				className={`url ds ${className}`} fill="currentColor" style={{width, height}}
		>
			<path
					transform="scale(3.55556, 3.55556)"
					className="color"
					d="M54.657,19.077c0,0 8.343,9.663 8.343,27.069v3.65c0,0 -10.536,6.866 -13.747,6.866l-3.115,-4.529c1.936,-0.867 4.577,-2.372 4.577,-2.372l-0.965,-0.747c0,0 -6.173,2.86 -13.749,2.86c-7.576,0 -13.749,-2.86 -13.749,-2.86l-0.965,0.747c0,0 2.641,1.505 4.577,2.372l-3.115,4.529c-3.213,0 -13.749,-6.866 -13.749,-6.866v-3.65c0,-17.406 8.343,-27.069 8.343,-27.069c0,0 5.707,-2.762 10.977,-3.489l1.635,3.1c0,0 2.599,-0.602 6.045,-0.602c3.446,0 6.045,0.602 6.045,0.602l1.635,-3.1c5.27,0.727 10.977,3.489 10.977,3.489zM27.01,43.603c2.656,0 4.808,-2.418 4.808,-5.401c0,-2.983 -2.153,-5.401 -4.808,-5.401c-2.655,0 -4.808,2.418 -4.808,5.401c0,2.983 2.152,5.401 4.808,5.401zM44.99,43.603c2.656,0 4.808,-2.418 4.808,-5.401c0,-2.983 -2.153,-5.401 -4.808,-5.401c-2.656,0 -4.808,2.418 -4.808,5.401c0,2.983 2.152,5.401 4.808,5.401z"
			/>
		</svg>
)

export const VkUrl = () => (
		<Link target="_blank" href={VK_URL} title="ВКонтакте">
			<VKSvg/>
		</Link>
)

export const VKSvg = ({className = "", width = "38px", height = "38px"}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg"
				className={`url vk ${className}`} fill="currentColor"
				style={{width, height}}
		>
			<path
					className="color"
					d="m21.4639,28.8396c-9.0192,0 -14.4928,-6.2576 -14.7056,-16.656l4.568,0c0.1424,7.6384 3.6176,10.88 6.2816,11.5408l0,-11.5408l4.3792,0l0,6.5904c2.5696,-0.2848 5.2576,-3.2832 6.1632,-6.5904l4.3056,0c-0.6896,4.0688 -3.616,7.0672 -5.6864,8.304c2.0704,1 5.4016,3.6176 6.6864,8.352l-4.7344,0c-1,-3.1648 -3.4512,-5.616 -6.7344,-5.9488l0,5.9488l-0.5232,0z"
			/>
		</svg>
)

/*export const BoostyUrl = () => (
		<Link target="_blank" href={BOOSTY_URL} title="Бусти">
			<BoostySvg/>
		</Link>
)

export const BoostySvg = ({className = ""}) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.6 292.2"
				className={`href boosty ${className}`} fill="currentColor"
		>
			<path
					className="color"
					d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9
		c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5
		c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z"
			/>
		</svg>
)*/

export const SupportUrl = () => (
		<Link target="_blank" href={SUPPORT_URL} title="Поддержка">
			<SupportSvg/>
		</Link>
)

export const SupportSvg = ({className = "", width = "38px", height = "38px"}: Svg) => (
		<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
		     className={`url support ${className}`} style={{width, height}}>
			<path
					className="color"
					d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"
			/>
		</svg>
)

export const YouTubeSvg = ({className = "", width, height}: Svg) => (
		<svg
				viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
				className={`url yt ${className}`} fill="currentColor"
				style={{width, height}}
		>
			<path
					d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"
					className="color"
			/>
			<path
					d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"
					className="transparent"
			/>
		</svg>)

export const TwitchSvg = ({className = "", width, height}: Svg) => (
		<svg
				viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
				className={`url twitch ${className}`} fill="currentColor" style={{width, height}}
		>
			<path
					d="M13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"
					className="transparent"
			/>
			<path
					d="M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z"
					className="color"
			/>
			<path
					d="M11.5 3.75h-1v3h1v-3zM8.75 3.75h-1v3h1v-3z"
					className="color"
			/>
		</svg>
)

export const DonationAlertsSvg = ({className = "", width = "1em", height = "1em"}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" style={{width, height}}
				className={`url donation_alerts ${className}`} fill="currentColor"
		>
			<path className="color" transform="scale(0.5)"
			      d="M34.859 46.588h-5.42a1.176 1.176 0 0 1-.83-.326.934.934 0 0 1-.284-.77l.479-4.888c.046-.52.531-.92 1.113-.918h5.42c.316-.001.617.118.83.327.212.209.315.49.283.77l-.478 4.888c-.047.52-.532.919-1.113.917Zm.868-9.568h-5.52c-.61 0-1.105-.476-1.105-1.064l1.502-16.51c.067-.537.542-.94 1.104-.936h5.521c.61 0 1.104.476 1.104 1.063l-1.546 16.522c-.07.516-.519.908-1.06.925Zm32.464-19.254c.587.682.874 1.57.796 2.464L66.83 44.76a3.338 3.338 0 0 1-1.008 2.114L48.174 63.908a3.38 3.38 0 0 1-2.35.942H27.038L10.5 80l1.28-15.16H3.37a3.378 3.378 0 0 1-2.484-1.085 3.334 3.334 0 0 1-.873-2.553L5.145 3.006A3.36 3.36 0 0 1 8.503 0H51.33c.986 0 1.922.428 2.562 1.172L68.19 17.766ZM55.11 40.08l1.372-15.14a3.334 3.334 0 0 0-.867-2.445l-8.067-9.259a3.377 3.377 0 0 0-2.541-1.152H19.596a3.36 3.36 0 0 0-3.358 3.006l-3.025 34.068c-.07.932.251 1.852.887 2.54a3.418 3.418 0 0 0 2.47 1.098H41.56a3.38 3.38 0 0 0 2.33-.922l10.214-9.67a3.338 3.338 0 0 0 1.009-2.124Z"/>
		</svg>
)

export const GoogleSvg = ({className = "", width, height}: Svg) => (
		<svg
				version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"
				xmlnsXlink="http://www.w3.org/1999/xlink" className={`url google ${className}`}
				style={{width, height}}
		>
			<path
					fill="#EA4335"
					d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
			/>
			<path
					fill="#4285F4"
					d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
			/>
			<path
					fill="#FBBC05"
					d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
			/>
			<path
					fill="#34A853"
					d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
			/>
			<path
					fill="none" d="M0 0h48v48H0z"
			/>
		</svg>
)

export const BatSvg = ({className = "", width, height}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 585"
				fill="currentColor" className={`red_color ${className}`}
				style={{width, height}}
		>
			<path
					d="M978.5 12.2c-.2.7-2.2 6.8-4.5 13.5-31.3 94.8-94 164.9-182.2 203.7-20.9 9.2-59.8 21.1-61.8 18.9-.4-.4-4.7-20.9-9.6-45.6-4.9-24.6-9.2-44.6-9.6-44.5-.4.2-9.3 8.5-19.7 18.6l-19 18.2-4.8-3c-8.6-5.5-16.7-7.3-30.1-6.7-7.5.3-13.5 1.1-16.6 2.2l-4.9 1.8-17.7-18.4-17.7-18.4-2.6 8.5c-1.4 4.7-8.3 27.6-15.2 51-6.9 23.4-13.1 44-13.6 45.8-1.3 4-1.1 4-21.4-2.5-83.4-27-146.6-78.1-189.4-153.3-11.9-21-27.8-59.9-30.6-75.3-.4-2-1.1-3.7-1.5-3.7-.4 0-2.5 2.1-4.6 4.7-5.9 7.3-19.9 21.9-29.4 30.7-46.3 43.1-105 71.2-170 81.5-15.1 2.4-34.5 4.1-48.3 4.2H43.5l11 2.3c69.4 14.5 114.1 50.1 127 101 1.3 5 2.6 12.6 3 16.9.6 6.3 1 7.7 2.2 7.3 3.7-1.5 18.3-4.8 29-6.7 14.9-2.6 42.7-3.6 54.4-2 41.4 5.9 70.7 27.1 89 64.6 6.7 13.7 11 26.3 13.9 40.3 2.2 11.2 4 24.8 4 30.8v4.2l9.2-5.5c10.6-6.4 19-10.1 31.4-14 8.3-2.5 10.2-2.7 26.4-2.7 16.1 0 18.2.2 26.5 2.7 11.9 3.6 28.8 12 40 19.9 11.1 7.8 34.4 30.8 45.4 44.6 9.7 12.3 24.5 34.4 33.6 50.2 7.7 13.3 23.7 45.7 28.6 57.9l3.4 8.4 1.3-4.9c12.6-47.3 37.4-81.5 79.2-109.3 39.2-26.2 93-44.3 149.9-50.6 8-.8 14.5-1.7 14.6-1.8.1-.1 1.2-5.6 2.4-12.2 13.8-72.4 48.8-121 99.1-137.4 26.7-8.8 59.6-9.2 88.6-1.1 6.4 1.7 6.4 1.7 6.8-.4 3-15.4 9.2-30.1 17.8-42.3 16-22.7 43.4-47.1 79.3-70.5 20-13.1 35.7-22 63.5-36.1 14-7.1 24.7-12.7 23.8-12.3-1 .3-7.1 1.3-13.5 2.3-18.3 2.7-59.9 2.4-79.3-.6-38.3-5.8-70.3-15.9-105.7-33.1-25.2-12.2-47.4-25.5-64.6-38.7-3.9-3-5.9-4-6.2-3.1z"/>
		</svg>
)

export const SuccessSvg = ({className = "", width = "1em", height = "1em"}: Svg) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={`successSvg green_color ${className}`} fill="currentColor"
		     viewBox="0 0 16 16" style={{width, height}}>
			<path
					d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
			<path
					d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
		</svg>
)

export const ErrorSvg = ({className = "", width = "1em", height = "1em"}: Svg) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={`errorSvg red_color ${className}`} fill="currentColor"
		     viewBox="0 0 16 16" style={{width, height}}>
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
			<path
					d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
		</svg>
)

export const EmailSvg = ({className = "", width, height}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
				className={`unic_color ${className}`} style={{width, height}}
		>
			<path
					d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
		</svg>
)

export const SearchSvg = ({className = "", width = "1em", height = "1em"}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}
				viewBox="0 0 16 16" style={{width, height}}
		>
			<path
					d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
		</svg>
)

export const AnotherSiteSvg = ({className = "", width = "1em", height = "1em"}: Svg) => (
		<svg
				xmlns="http://www.w3.org/2000/svg" fill="currentColor"
				className={className} viewBox="0 0 16 16"
				style={{width, height}}
		>
			<path
					d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
			<path
					d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
		</svg>
)

export const SVGS = {
	discord: <DiscordSvg width="38px" height="38px"/>,
	telegram: <TelegramSvg width="38px" height="38px"/>,
	vk: <VKSvg width="38px" height="38px"/>,
	twitch: <TwitchSvg width="38px" height="38px"/>,
	youtube: <YouTubeSvg width="38px" height="38px"/>,
	donationAlerts: <DonationAlertsSvg width="38px" height="38px"/>
}

export type SVGS_NAME = keyof typeof SVGS