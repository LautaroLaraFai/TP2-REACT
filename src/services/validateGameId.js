import i18n from "../i18n.js";

const API_BASE_URL = "http://localhost:3000";

export const validateGameId = async (id, navigate) => {
	const gameId = Number(id);

	if (!id || isNaN(gameId) || gameId < 1) {
		navigate("/detail/error");
		return false;
	}

	try {
		const response = await fetch(
			`${API_BASE_URL}/games/${gameId}?lang=${i18n.language}`,
		);

		if (!response.ok) {
			navigate("/detail/error");
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error validando juego:", error);
		navigate("/detail/error");
		return false;
	}
};
