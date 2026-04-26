export async function getDataByID(id) {
    try {
        const response = await fetch(`https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const allGames = await response.json();
        
        const foundGame = allGames.find(game => String(game.id) === String(id));
        
        return foundGame || null;
        
    } catch (error) {
        console.error("Error en getDataByID:", error);
        return null; 
    }
}