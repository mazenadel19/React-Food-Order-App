import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = props => {
	const cartCtx = useContext(CartContext)

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
	const hasItems = cartCtx.items.length > 0

	const cartItemAddHandler = item => {
		cartCtx.addItem({ ...item, amount: 1 })
	}

	const cartItemRemoveHandler = id => {}

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map(item => (
				<CartItem
					key={item.id}
					name={item.name}
					price={item.price}
					amount={item.amount}
					onAdd={cartItemAddHandler.bind(null, item)} //ensure the item is passed with the function
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
				/>
			))}
		</ul>
	)

	return (
		<Modal hideTheModal={props.hideTheModal}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']} onClick={props.hideTheModal}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	)
}

export default Cart
