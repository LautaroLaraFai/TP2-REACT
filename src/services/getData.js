async function getData() {
    try {
        const response = await fetch("https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games")
        const games = await response.json()  
        return games 
    } catch (error) {
        console.error(error)
    }
     
}