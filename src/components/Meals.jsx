// import { useContext } from "react";
// import { AppContext } from "../context";

// const Meals = () => {
//     const context = useContext(AppContext)
//     console.log(context)
//     return (
//       <h1>Meals</h1>
//     );
//   }

// second method ####################################################################
import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from 'react-icons/bs';

const Meals = () => {
    const {meals, loading, selectMeal, addToFavorites} = useGlobalContext()
    if (loading) {
        return <section className="section">
            <h4>Loading...</h4>
        </section>
    }
    if (!meals.length) {
        return <section className="section">
            <h4>No Matching Meal Found</h4>
        </section>
    }
    return (
        <section className="section-center">
            {meals.map((singleMeal) => {
            const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
            return <article key={idMeal} className="single-meal">
                <img src={image} className="img" onClick={() => selectMeal(idMeal)} />
                <footer>
                    <h5>{title}</h5>
                    <button className='like-btn' onClick={() => addToFavorites(idMeal)} ><BsHandThumbsUp /></button>
                </footer>
            </article>
            })}
        </section>
    ) 
  }
  
  export default Meals;