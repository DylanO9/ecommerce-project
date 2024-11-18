import React, { useEffect, useState } from 'react';
import '../styles/MainShop.css'
import Card from './Card';
import testData from '../assets/testData.json';
import Carousel from './Carousel';

export default function MainShop() {
    const [data, setData] = useState(null);
    const [parsedResult, setParsedResult] = useState(null);
    useEffect(() => {
        // const url = 'https://depop-thrift.p.rapidapi.com/search?page=1&country=us&sort=newlyListed';
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'x-rapidapi-key': '834b99fcaemsh4f1ff02156e1aecp141eb9jsn6bf831eb2667',
        //         'x-rapidapi-host': 'depop-thrift.p.rapidapi.com'
        //     }
        // };

        // const fetchData = async () => {
        //     try {
        //         const response = await fetch(url, options);
        //         const result = await response.text();
        //         setData(result);
        //         setParsedResult(JSON.parse(result));
        //         console.log(JSON.parse(result));
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };

        // fetchData();
        setParsedResult(testData);
    }, []);

    return (
        // map through the parsedResult and display each item in a Card component
        <main id="shop">
        {/* {parsedResult && Object.entries(parsedResult).map(([key, value]) => (
            <ul>
                <Card key={key} item={value} />
            </ul>
        ))} */}
        <Carousel name="streetwear" parsedResult={parsedResult}/>
        {parsedResult && <Carousel name="vintage" parsedResult={parsedResult.slice(6,12)}/>}
        </main>
    );
}