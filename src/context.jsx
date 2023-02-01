import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'


const AppProvider = ({children}) => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModel, setShowModel] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favoriteMeals, setFavoriteMeals] = useState(JSON.parse(localStorage.getItem('favoriteMeals')) || [])

    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const {data} = await axios(url)
            if (data.meals) {
                setMeals(data.meals) 
            }            
        }catch(error) {
            console.log(error.response)
        }
        setLoading(false)
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal
        favoriteMeal ? meal = favoriteMeals.find(meal => meal.idMeal === idMeal) : meal = meals.find(meal => meal.idMeal === idMeal)
        setSelectedMeal(meal)
        setShowModel(true)
    }

    const closeModal = () => {
        setShowModel(false)
    }

    const addToFavorites = (idMeal) => {
        let alredyFavorite = favoriteMeals.find(meal => meal.idMeal === idMeal)
        if (!alredyFavorite) {
            let meal = meals.find(meal => meal.idMeal === idMeal)
            setFavoriteMeals(prevMeals => [...prevMeals, meal])
        }
    }

    const removeFromFavorites = (idMeal) => {
        setFavoriteMeals(prevFavorites => prevFavorites.filter(meal => meal.idMeal !== idMeal))
    }

    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])

    useEffect(() => {
        localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals))
    }, [favoriteMeals])

    return <AppContext.Provider value={
        { 
            meals, 
            loading, 
            setSearchTerm, 
            fetchRandomMeal,
            showModel,
            selectedMeal,
            selectMeal,
            closeModal,
            addToFavorites,
            removeFromFavorites,
            favoriteMeals,
        }} >
            {children}
        </AppContext.Provider>
}

// second method ####################################################################
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}