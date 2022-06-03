import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCardButton.module.css';

const HeaderCardButton = props => {
    const [buttonAnimated, setButtonAnimated] = useState(false);
    const cartContext = useContext(CartContext);
    const { items } = cartContext;
    const numberOfCartItems = cartContext.items.reduce((acum, currItem) => acum + currItem.amount, 0);
    const btnClasses = `${classes.button} ${buttonAnimated ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) return;
        setButtonAnimated(true);

        const timer = setTimeout(() => {
            setButtonAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button onClick={props.openCart} className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};
export default HeaderCardButton;
