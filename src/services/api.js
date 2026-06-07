const API_URL = 'http://localhost:3000';

export default async function getData({ page = 1, limit = 60 } = {}) {
    try {
        const response = await fetch(`${API_URL}/games?page=${page}&limit=${limit}`);
        const data = await response.json();
        
        return data.message || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}