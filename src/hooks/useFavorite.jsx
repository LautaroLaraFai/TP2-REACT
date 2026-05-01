export const useFavorite = () => {
    useEffect(() => {
        const loadFavorites = async () => {
            try {
            const favoritesIdsRaw = JSON.parse(localStorage.getItem('favorites') || '[]');
            const favoritesIds = favoritesIdsRaw.map(id => Number(id));
            
            if (favoritesIds.length === 0) {
                setFavoriteGames([]);
                setLoading(false);
                return;
            }
            
            const games = await Promise.all(
                favoritesIds.map(async (id) => {
                const gameData = await getDataByID(id);
                return gameData;
                })
            );
            
            setFavoriteGames(games.filter(game => game !== null));
            setLoading(false);
            } catch (error) {
            console.error('Error:', error);
            setFavoriteGames([]);
            setLoading(false);
            }
        };

        loadFavorites();
        window.addEventListener('storage', loadFavorites);
        window.addEventListener('focus', loadFavorites);
        
        return () => {
            window.removeEventListener('storage', loadFavorites);
            window.removeEventListener('focus', loadFavorites);
        };
        }, []);

        const removeFavorite = (gameId) => {
            const favoritesIdsRaw = JSON.parse(localStorage.getItem('favorites') || '[]');
            const newFavorites = favoritesIdsRaw.filter(id => Number(id) !== Number(gameId));  
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            setFavoriteGames(prev => prev.filter(game => Number(game.id) !== Number(gameId)));  
        };

        const toggleFavorite = (gameId) => {
        const idNumber = Number(gameId);
        const newFavorites = favorites.includes(idNumber) 
        ? favorites.filter(id => Number(id) !== idNumber)
        : [...favorites, idNumber];
        
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };    
}