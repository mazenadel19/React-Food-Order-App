import React, { useRef } from 'react'
import classes from './Checkout.module.css'

const Checkout = props => {
	const nameInputRef = useRef()
	const streetInputRef = useRef()
	const cityInputRef = useRef()
	const postalInputRef = useRef()

	const submitHandler = e => {
		e.preventDefault()
		const enteredName = nameInputRef.current.value
		const enteredStreet = streetInputRef.current.value
		const enteredPostal = cityInputRef.current.value
		const enteredCity = postalInputRef.current.value
		console.log(enteredName, enteredStreet, enteredPostal, enteredCity)
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef} />
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.hideTheModal}>
					Cancel
				</button>
				<button className={classes['button--alt']}>Confirm</button>
			</div>
		</form>
	)
}

export default Checkout