import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import { useEffect, useState } from 'react'

const AvailableMeals = () => {
	const [meals, setMeals] = useState([])

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://food-app-b7b46-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
			)
			console.log(response)
			const responseData = await response.json()

			const loadMeals = []
			
			for (const key in responseData) {
				loadMeals.push({
					id: key,
					name: responseData[key].name,
					price: responseData[key].price,
					description: responseData[key].description,
				})
			}

			setMeals(loadMeals)
		}

		fetchMeals()
	}, [])

	const mealsList = meals.map(meal => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	))

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	)
}

export default AvailableMeals
