import '../styles/Card.css';
import { Link } from 'react-router-dom';

export default function Card(props) {
    return (
        <li className="card">
            {/* display image of firstParsedResult */}
            {props.item && <img src={props.item.preview["1280"]} alt="product" />}
            {/* display product name of firstParsedResult */}
            {props.item && <p id="price">${props.item.price.priceAmount}</p>}
            {/* display size of firstParsedResult */}
            {props.item && <p>{props.item.sizes[0]}</p>}
            {/* display brand name of firstParsedResult */}
            {props.item && <p>{props.item.brandName}</p>}
            {/* Link to the product page */}
            {props.item && <Link to={`/product`}>View Product</Link>}
        </li>
    )
}