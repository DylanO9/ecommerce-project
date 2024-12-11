import '../styles/Product.css';
import testData from '../assets/testData.json';
import Carousel from './Carousel';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';

export default function Product() {
    const fp = Object.values(testData)[0];
    const { user } = useContext(UserContext);
    
    const cartHandler = () => {
        console.log('Added to cart');
        console.log(fp);
        console.log(user);
        // Post request to add item to cart
        // fetch('http://localhost:3001/api/cart/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user_id: user.user_id,
        //         item_ids: fp.id,
        //         status: 'active',
        //     }),
        // })
        // instead of adding through api call, you can add to local storage
        let cart = localStorage.getItem('cart');
        if (!cart) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        cart.push(fp);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return (
        <main id="product">
            <section id="product-elements">
                <section id="product-images">
                    <img src={fp.pictures[0]["1280"]} alt="product name" />
                    <img src={fp.pictures[2]["1280"]} alt="product name" />
                </section>
                <section id="product-info">
                    <h2>{fp.brandName}</h2>
                    <p className="product-price">${fp.price.priceAmount}</p>
                    <p className="product-size">Size {fp.sizes[0]}</p>
                    <button onClick={cartHandler}>Add to Cart</button>
                    <button>Save</button>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </section>
            </section>
            <Carousel name="streetwear" parsedResult={testData}/>
        </main>
    )
}