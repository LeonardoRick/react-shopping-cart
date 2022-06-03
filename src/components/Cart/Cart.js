import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
    const cartContext = useContext(CartContext);
    const cartItemAddHandler = item => {
        cartContext.addItem(item);
    };
    const cartItemRemoveHandler = id => {
        cartContext.removeItem(id);
    };
    return (
        <Modal onClose={props.onHideCart}>
            <ul className={classes['cart-items']}>
                {cartContext.items.map(item => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    />
                ))}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartContext.totalAmount?.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                {cartContext.items.length > 0 && (
                    <button onClick={props.onHideCart} className={classes['button--alt']}>
                        Close
                    </button>
                )}
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};
export default Cart;
