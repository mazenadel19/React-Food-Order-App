import Modal from '../UI/Modal'
import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

import classes from './Cart.module.css'

const Cart = props => {
	const [isCheckout, setIsCheckout] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [didSubmit, setDidSubmit] = useState(false)

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

	const submitOrderHandler = async userData => {
		setIsSubmitting(true)
		setDidSubmit(false)
		await fetch(
			'https://food-app-b7b46-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderItem: cartCtx.items,
				}),
			},
		)
		setIsSubmitting(false)
		setDidSubmit(true)
		cartCtx.clearCart()
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

	const cartModalContent = (
		<>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<Checkout
					onConfirm={submitOrderHandler}
					hideTheModal={props.hideTheModal}
				/>
			)}
			{!isCheckout && modalActions}
		</>
	)

	const isSubmittingModalContent = <p>Sending order data...</p>
	const didSubmitModalContent = (
		<>
			<p>SUCCESSFULLY SENT YOUR ORDER !!!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.hideTheModal}>
					Close
				</button>
			</div>
		</>
	)

	return (
		<Modal hideTheModal={props.hideTheModal}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && !didSubmit && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	)
}

export default Cart
