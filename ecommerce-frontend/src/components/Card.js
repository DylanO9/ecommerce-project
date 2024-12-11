import '../styles/Card.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Card(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li 
            className="card" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Wrap image with Link to make it clickable */}
            {props.item && (
                <Link to={`/product`}>
                    <img 
                        src={isHovered ? props.item.pictures[1]["1280"] : props.item.pictures[0]["1280"]} 
                        alt="product" 
                    />
                </Link>
            )}
            {/* display product name of firstParsedResult */}
            {props.item && <p id="price">${props.item.price.priceAmount}</p>}
            {/* display size of firstParsedResult */}
            {props.item && <p>{props.item.sizes[0]}</p>}
            {/* display brand name of firstParsedResult */}
            {props.item && <p>{props.item.brandName}</p>}
        </li>
    )
}
