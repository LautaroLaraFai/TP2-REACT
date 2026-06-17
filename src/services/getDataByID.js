import i18n from "../i18n.js";

import { API_BASE_URL } from "../config/apiurl.js";

export async function getDataByID(id) {
	try {
		const response = await fetch(
			`${API_BASE_URL}/games/${id}?lang=${i18n.language}`,
		);

		if (!response.ok) {
			if (response.status === 404) {
				console.warn(`Juego con ID ${id} no encontrado`);
				return null;
			}
			throw new Error(`Error HTTP: ${response.status}`);
		}

		const game = await response.json();

		if (game.screenshots && Array.isArray(game.screenshots)) {
			game.Screenshots = game.screenshots.map((s) => s.imageUrl);
		}

		if (game.genres && Array.isArray(game.genres)) {
			game.Genres = game.genres.map((g) => g.name);
		}

		return game;
	} catch (error) {
		console.error("Error en getDataByID:", error);
		return null;
	}
}
