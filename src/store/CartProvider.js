import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};
const cartReducer = (state, action) => {
    let updatedItems;
    let index;
    let updatedAmount;
    switch (action.type) {
        case 'ADD':
            updatedAmount = state.totalAmount + action.item.price * action.item.amount;
            index = state.items.findIndex(item => item.id === action.item.id);

            // if the item already exists, we just update the number of it.
            // if not, we add it to the list (NEVER UPDATING THE state VARIABLE, ALWAYS CREATING A NEW LIST)
            if (index !== -1) {
                const existingItem = { ...state.items[index] };
                existingItem.amount += action.item.amount;
                updatedItems = [...state.items];
                updatedItems[index] = existingItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }
            return { items: updatedItems, totalAmount: updatedAmount };
        case 'REMOVE':
            index = state.items.findIndex(item => item.id === action.id);
            const toBeRemoved = { ...state.items[index] };
            updatedAmount = state.totalAmount - toBeRemoved.price;

            // if this is the last item of this type on the list, remove it completly,
            // if there's more of them, remove only one and do not remove the item from the list
            if (toBeRemoved.amount === 1) {
                return {
                    items: state.items.filter(item => item.id !== action.id),
                    totalAmount: updatedAmount
                };
            } else {
                toBeRemoved.amount -= 1;
                updatedItems = [...state.items];
                updatedItems[index] = toBeRemoved;
                return {
                    items: updatedItems,
                    totalAmount: updatedAmount
                };
            }
        default:
            return state;
    }
};

// Component that handle all the reducer logic (adding and removing from the cart)
const CartProvider = props => {
    const [cart, dispatchCart] = useReducer(cartReducer, defaultCartState);
    const addItemHandler = item => {
        dispatchCart({ type: 'ADD', item });
    };
    const removeItemHandler = id => {
        dispatchCart({ type: 'REMOVE', id });
    };
    const cartContext = {
        items: cart.items,
        totalAmount: cart.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };
    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
