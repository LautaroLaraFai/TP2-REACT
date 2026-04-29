import { useState, useEffect } from 'react'
import getData from "./getData";
import { getDataByID } from './getDataByID';


let savedGames = null

export const useGames = () => {
    const [games, setGames] = useState(savedGames)

    useEffect(() => {
        const load = async () => {
            if (savedGames) {
                setGames(savedGames)
                return
            }
            
            const data = await getData()
            savedGames = data
            setGames(data)
        }
        
        load()
    }, [])

    return games
}

let lastID = null
let savedGame = null

export const useGamesByID = (id) => {
    const [game, setGame] = useState(savedGame)

    useEffect(() => {
        const loadByID = async () => {
            if (lastID === id) {
                setGame(savedGame)
                return
            }
            
            const data = await getDataByID(id)
            lastID = id
            savedGame = data
            setGame(data)
        }

        loadByID()
    }, [id])

    return game
}