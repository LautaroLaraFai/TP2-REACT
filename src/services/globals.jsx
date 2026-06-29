import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getDataByID } from './getDataByID';

let lastID = null
let lastLang = null
let savedGame = null

export const useGamesByID = (id) => {
    const { i18n } = useTranslation()
    const [game, setGame] = useState(savedGame)
    const location = useLocation()

    const isDetailPage = location.pathname.startsWith('/detail/')

    useEffect(() => {
        if (!isDetailPage) return
        if (!id) return

        const loadByID = async () => {
            const currentLang = i18n.language
            if (lastID === id && lastLang === currentLang && savedGame) {
                setGame(savedGame)
                return
            }
            
            const data = await getDataByID(id)
            lastID = id
            lastLang = currentLang
            savedGame = data
            setGame(data)
        }

        loadByID()
    }, [id, isDetailPage, i18n.language])

    return game
}