import { useRef, useState } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = props => {
	const [amountIsValid, setAmountIsValid] = useState(true)

	const amountInputRef = useRef()

	const submitHandler = event => {
		event.preventDefault()

		let enteredAmount = amountInputRef.current.value
		const enteredAmountNumber = Number(amountInputRef.current.value)

		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			return setAmountIsValid(false)
		}

		setAmountIsValid(true)

		props.onAddToCart(enteredAmountNumber)
		amountInputRef.current.value = 1
	}

	return (
		<form className={classes.form}>
			<Input
				ref={amountInputRef}
				label='Amount'
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button onClick={submitHandler}>+ Add</button>
			{!amountIsValid && <p>please enter a valid amount(1-5)</p>}
		</form>
	)
}

export default MealItemForm
