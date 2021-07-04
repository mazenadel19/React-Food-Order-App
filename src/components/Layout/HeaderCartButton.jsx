import { useContext } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
	const cartCtx = useContext(CartContext)

	const numberOfCartItems = cartCtx.items.reduce(
		(currentVal, acc) => currentVal + acc.amount,
		0, //inital value
	)

	return (
		<button className={classes.button} onClick={props.showTheModal}>
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
