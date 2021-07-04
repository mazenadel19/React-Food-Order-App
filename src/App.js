import { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import CartProvider from './store/CartProvider';

function App() {
	const [modalVisibility, setModalVisibility] = useState(false)

	const showTheModal = () => {
		setModalVisibility(true)
	}

	const hideTheModal = () => {
		setModalVisibility(false)
	}

	return (
		<CartProvider>
			{modalVisibility && <Cart hideTheModal={hideTheModal} />}
			<Header showTheModal={showTheModal} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	)
}

export default App
