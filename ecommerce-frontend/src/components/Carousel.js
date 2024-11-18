import '../styles/Carousel.css';
import Card from './Card';

export default function Carousel(props) {
    return (
        <section className="carousel">
            <h2>Checkout the new <span>"{props.name}"</span></h2>
            <ul>
                {props.parsedResult && Object.entries(props.parsedResult.slice(0,6)).map(([key, value]) => (
                        <Card key={key} item={value} />
                ))}
            </ul>
        </section>
    )
}