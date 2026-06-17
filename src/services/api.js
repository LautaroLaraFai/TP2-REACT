import i18n from "../i18n.js";

import { API_BASE_URL } from "../config/apiurl.js";

export default async function getData({ page = 1, limit = 60 } = {}) {
	try {
		const response = await fetch(
			`${API_BASE_URL}/games?page=${page}&limit=${limit}&lang=${i18n.language}`,
		);
		const data = await response.json();

		return data.message || [];
	} catch (error) {
		console.error(error);
		return [];
	}
}
