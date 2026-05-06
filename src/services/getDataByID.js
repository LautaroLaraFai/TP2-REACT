export async function getDataByID(id) {
    try {
        const response = await fetch(`https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games/${id}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Juego con ID ${id} no encontrado`);
                return null;
            }
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const game = await response.json();
        return game;
        
    } catch (error) {
        console.error("Error en getDataByID:", error);
        return null;
    }
}