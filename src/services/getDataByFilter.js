const API_BASE_URL = 'http://localhost:3000';

export default async function getDataByFilter(param, value) {
  try {
    const url = `${API_BASE_URL}/games?${param}=${encodeURIComponent(value)}`;
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