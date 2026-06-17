import i18n from "../i18n.js";

import { API_BASE_URL } from "../config/apiurl.js";

export default async function getDataByFilter(param, value) {
	try {
		const url = `${API_BASE_URL}/games?${param}=${encodeURIComponent(value)}&lang=${i18n.language}`;
		const response = await fetch(url);

		if (!response.ok) {
			console.error("HTTP error:", response.status);
			return [];
		}

		const data = await response.json();

		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error("Error en getDataByFilter: ", error);
		return [];
	}
}
