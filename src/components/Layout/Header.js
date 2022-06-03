import mealsImage from '../../assets/images/meals.jpg';
import classes from './Header.module.css';
import HeaderCardButton from './HeaderCardButton';

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCardButton openCart={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!"></img>
            </div>
        </>
    );
};

export default Header;
