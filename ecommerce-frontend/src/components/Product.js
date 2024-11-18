import '../styles/Product.css';
import testData from '../assets/testData.json';
import Carousel from './Carousel';

export default function Product() {
    const fp = testData.slice(0,1);
    console.log(fp);
    return (
        <main id="product">
            <section id="product-elements">
                <section id="product-images">
                    <img src={fp[0].pictures[0]["1280"]} alt="product name" />
                    <img src={fp[0].pictures[2]["1280"]} alt="product name" />
                </section>
                <section id="product-info">
                    <h2>{fp[0].brandName}</h2>
                    <p className="product-price">${fp[0].price.priceAmount}</p>
                    <p className="product-size">Size {fp[0].sizes[0]}</p>
                    <button>Add to Cart</button>
                    <button>Save</button>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </section>
            </section>
            <Carousel name="streetwear" parsedResult={testData}/>
        </main>
    )
}