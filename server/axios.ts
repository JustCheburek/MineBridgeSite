import axios from "axios";

export const api = axios.create({
	baseURL: `${process.env.MB_URL}/api`,
	withCredentials: true
})