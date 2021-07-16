import Modal from '../UI/Modal'
import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

import classes from './Cart.module.css'

const Cart = props => {
	const [isCheckout, setIsCheckout] = useState(false)

	const cartCtx = useContext(CartContext)

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
	const hasItems = cartCtx.items.length > 0

	const cartItemAddHandler = item => {
		cartCtx.addItem({ ...item, amount: 1 })
	}

	const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id)
	}

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

	const orderHandler = () => {
		setIsCheckout(true)
	}

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.hideTheModal}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	)

	return (
		<Modal hideTheModal={props.hideTheModal}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && <Checkout hideTheModal={props.hideTheModal} />}
			{!isCheckout && modalActions}
		</Modal>
	)
}

export default Cart
