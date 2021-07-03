import { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'

function App() {
	const [modalVisibility, setModalVisibility] = useState(false)

	const showTheModal = () => {
		setModalVisibility(true)
	}

	const hideTheModal = () => {
		setModalVisibility(false)
	}

	return (
		<>
			{modalVisibility && <Cart hideTheModal={hideTheModal} />}
			<Header showTheModal={showTheModal} />
			<main>
				<Meals />
			</main>
		</>
	)
}

export default App
