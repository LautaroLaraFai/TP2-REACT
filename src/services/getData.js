export default async function getData() {
    try {
        const response = await fetch("https://69e6dd1368208c1debe7fc08.mockapi.io/SNG/Games")
        const games = await response.json()  
        return games 
    } catch (error) {
        console.error(error)
    }
}

// response example
// [
//  {
//     "id": 1,
//     "Name": "Grand Theft Auto V",
//     "Rating": 4,
//     "Image": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
//     "ReleaseDate": "2013-09-17",
//     "Genres": [
//       "Action"
//     ],
//     "Developer": "Rockstar North",
//     "Screenshots": [
//       "https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg",
//       "https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg",
//       "https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg",
//       "https://media.rawg.io/media/screenshots/eb0/eb0a2c0de9194a635fc0cd04f5a29ae7.jpg",
//       "https://media.rawg.io/media/screenshots/ec7/ec7f05fb82290fea9647b7879fe9a6bf.jpg"
//     ],
//     "Price": "17.43"
//   },
// ], ...