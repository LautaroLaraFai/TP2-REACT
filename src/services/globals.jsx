//!  Este archivo es un intento de optimizar los fetchs
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getDataByID } from './getDataByID';

let lastID = null
let savedGame = null

export const useGamesByID = (id) => {
    const [game, setGame] = useState(savedGame)
    const location = useLocation()

    // Solo hacer fetch si la pagina actual es Detail
    const isDetailPage = location.pathname.startsWith('/detail/')

    useEffect(() => {
        if (!isDetailPage) return
        if (!id) return

        const loadByID = async () => {
            if (lastID === id && savedGame) {
                setGame(savedGame)
                return
            }
            
            const data = await getDataByID(id)
            lastID = id
            savedGame = data
            setGame(data)
        }

        loadByID()
    }, [id, isDetailPage])

    return game
}