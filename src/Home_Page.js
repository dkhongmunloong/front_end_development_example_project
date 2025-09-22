import CarouselProducts from './CarouselProducts.js';
import CarouselReviews from './CarouselReviews.js';

// this component is actually about us page top level component
export default function Home_Page(props) {

    return (
        <div>
            <CarouselProducts></CarouselProducts>
            <CarouselReviews></CarouselReviews>
        </div>
    );    
}