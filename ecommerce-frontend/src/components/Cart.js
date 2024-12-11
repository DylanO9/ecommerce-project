import '../styles/Cart.css';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';

export default function Cart() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const temp_cart = localStorage.getItem('cart');
            if (temp_cart) {
                setCart(JSON.parse(temp_cart));
                setData(temp_cart);
            }
        }
        fetchData();
    }
    , [user]);

    useEffect(() => {
        const calculateTotal = () => {
            let subtotal = 0;
            let discount = 0;
            let shipping = 0;
            for (const item in cart) {
                subtotal += parseFloat(cart[item].price.priceAmount);
                discount += parseFloat(cart[item].price.priceAmount) * parseFloat(cart[item].price.discountPercentage) / 100;
                shipping += parseFloat(cart[item].price.nationalShippingCost);
            }
            let total = subtotal + shipping - discount;
            total = total.toFixed(2);
            document.getElementById('cart-total-number').innerText = `$${total}`;
            document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
            document.getElementById('shipping-cost').innerText = `$${shipping.toFixed(2)}`;
            document.getElementById('discount').innerText = `-$${discount.toFixed(2)}`;
        }
        calculateTotal();
    }
    , [cart]);

    const removeItem = (index) => {
        return () => {
            let newCart = cart.slice();
            newCart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }
    }

    return (
        <main id="cart">
            <h1>Cart</h1>
            <section id="cart-information">
                <section id="cart-items">
                    {/* for each cart-item make a section of cart-item*/}
                    {cart && cart.map((item, index) => (
                        <section key={index} className="cart-item">
                            <img src={item.preview["210"]} alt="product name" />
                            <section className="cart-item-info">
                                <p>${item.price.priceAmount}</p>
                                <p>Size {item.sizes[0]}</p>
                                <button onClick={removeItem(index)}>Remove</button>
                            </section>
                        </section>
                    ))}
                </section>
                <section id="cart-total">
                    <h2>Transaction</h2>
                    <ul>
                        <li className="cart-row">
                            <span className="cart-label">Subtotal</span>
                            <span className="cart-value" id="subtotal"></span>
                        </li>
                        <li className="cart-row">
                            <span className="cart-label">Discount</span>
                            <span className="cart-value" id="discount"></span>
                        </li>
                        <li className="cart-row">
                            <span className="cart-label">Shipping</span>
                            <span className="cart-value" id="shipping-cost"></span>
                        </li>
                        <li className="cart-row">
                            <span className="cart-label">Total</span>
                            <span className="cart-value" id="cart-total-number"></span>
                        </li>
                    </ul>
                    <button>Checkout</button>
                </section>
            </section>
        </main>
    )
}