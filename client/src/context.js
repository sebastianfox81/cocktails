import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [ loading, setLoading ] = useState(true);
  const [ searchTerm, setSearchTerm ] = useState('margarita');
  const [ cocktails, setCocktails ] = useState([]);

  const fetchDrinks = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${url}${searchTerm}`);
      const data = await res.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
          return {
            id: idDrink,
            name: strDrink,
            img: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          }
          setCocktails(newCocktails)
        })
      } else {
        setCocktails([])
      }
      setLoading(false)
      console.log(drinks)

    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchDrinks();
  }, [searchTerm])




  return <AppContext.Provider
  value={
    loading,
    cocktails,
    setSearchTerm
  }
  >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
