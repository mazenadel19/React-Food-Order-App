import React from 'react'

const CartContext = React.createContext({
	//is this object useless??? what is the point of this object if context is using values passed through CartProvieder ??
	items: [],
	totalAmount: 0,
	addItem: () => {},
	removeItem: () => {},
	clearCart: () => {},
})

export default CartContext
