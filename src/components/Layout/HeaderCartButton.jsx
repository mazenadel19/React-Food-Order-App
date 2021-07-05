import { useState, useContext, useEffect } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
	const [btnAnimation, setBtnAnimation] = useState(false)

	const cartCtx = useContext(CartContext)
	const { items } = cartCtx

	const numberOfCartItems = items.reduce(
		(currentVal, acc) => currentVal + acc.amount,
		0, //inital value
	)

	useEffect(() => {
		if (items.length === 0) return

		setBtnAnimation(true)

		const timerID = setTimeout(() => {
			setBtnAnimation(false)
		}, 300)
		return () => {
			clearTimeout(timerID)
		}
	}, [items])

	const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ''}`

	return (
		<button className={btnClasses} onClick={props.showTheModal}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			{/* <span className={classes.badge}>{0}</span> */}
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	)
}

export default HeaderCartButton
