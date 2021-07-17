import React, { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const isNotEmpty = value => value.trim().length !== 0
const isFiveChar = value => value.trim().length === 5

const Checkout = props => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		postal: true,
		city: true,
	})
	const nameInputRef = useRef()
	const streetInputRef = useRef()
	const cityInputRef = useRef()
	const postalInputRef = useRef()

	const submitHandler = e => {
		e.preventDefault()

		const enteredName = nameInputRef.current.value
		const enteredStreet = streetInputRef.current.value
		const enteredPostal = postalInputRef.current.value
		const enteredCity = cityInputRef.current.value

		const isValidName = isNotEmpty(enteredName)
		const isValidStreet = isNotEmpty(enteredStreet)
		const isValidPostal = isFiveChar(enteredPostal)
		const isValidCity = isNotEmpty(enteredCity)

		setFormInputsValidity({
			name: isValidName,
			street: isValidStreet,
			postal: isValidPostal,
			city: isValidCity,
		})

		const isValidForm =
			isValidName && isValidStreet && isValidPostal && isValidCity

		if (!isValidForm) {
			return
		}

		//submit the form
		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postal: enteredPostal,
			city: enteredCity,
		})
	}

	const nameControlClasses = !formInputsValidity.name && classes.invalid
	const streetControlClasses = !formInputsValidity.street && classes.invalid
	const postalControlClasses = !formInputsValidity.postal && classes.invalid
	const cityControlClasses = !formInputsValidity.city && classes.invalid

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.formWrapper}>
				<div className={`${classes.control} ${nameControlClasses}`}>
					<label htmlFor='name'>Your Name</label>
					<input type='text' id='name' ref={nameInputRef} />
					{!formInputsValidity.name && <small>Your Name Field Can't Be Empty</small>}
				</div>
				<div className={`${classes.control} ${streetControlClasses}`}>
					<label htmlFor='street'>Street</label>
					<input type='text' id='street' ref={streetInputRef} />
					{!formInputsValidity.street && <small>Street Field Can't Be Empty</small>}
				</div>
				<div className={`${classes.control} ${postalControlClasses}`}>
					<label htmlFor='postal'>Postal Code</label>
					<input type='text' id='postal' ref={postalInputRef} />
					{!formInputsValidity.postal && (
						<small>Postal Code Field Must Have Five Digits</small>
					)}
				</div>
				<div className={`${classes.control} ${cityControlClasses}`}>
					<label htmlFor='city'>City</label>
					<input type='text' id='city' ref={cityInputRef} />
					{!formInputsValidity.city && <small>City Field Can't Be Empty</small>}
				</div>
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
