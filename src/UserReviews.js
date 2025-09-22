import { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function GenerateDateText(dateString) {
    if (typeof dateString === 'string') {
        const date1 = new Date(dateString);
        const year1 = date1.getFullYear().toString();
        const month1 = (date1.getMonth() + 1).toString();
        const day1 = date1.getDate().toString();
        const returnDate = `${day1}-${month1}-${year1}`;
        return returnDate;
    } else {
        return 'Posted date';
    }
}

function iconStars(rating_num) {
    if (typeof rating_num !== 'undefined') {
        const max_stars_num = 5;

        let rating_stars = [];

        for (let i = 0; i < rating_num; i++) {
            const one_filled_star = <i className="bi bi-star-fill" key={"one_star_" + i.toString()}></i>;
            rating_stars.push(one_filled_star);
        }
        const unfilled_stars = max_stars_num - rating_num;
        for (let i = 0; i < unfilled_stars; i++) {
            const one_empty_star = <i className="bi bi-star" key={"empty_star_" + i.toString()}></i>;
            rating_stars.push(one_empty_star);
        }
        return rating_stars;
    } else {
        return <></>;
    }
}

// this component handles the styling of the user review display cards
export default function UserReviews(props) {
    const imgUrl1 = './images/item_1.png';
    const imgUrl2 = './images/item_2.png';
    const imgUrl3 = './images/item_3.png';
    const [userReviews, setUserReviews] = useState([]);
    let reviewsLoaded = false;

    // simulate HTTP GET request using local json file via useEffect
    useEffect(() => {
        axios
            .get('./data/reviewsdata.json')
            .then((response) => {
                setUserReviews(response.data);
                reviewsLoaded = true;
            })
            .catch((error) => {
                console.error('Error loading JSON:', error);
                reviewsLoaded = false;
            });
    }, []);

    return (
        <>
            <div className="container reviews">
                <div className="row mt-2 mb-4">
                    <div className="col-sm-6 col-lg-4 my-2 d-flex justify-content-center">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center">Customer testimonial {props.startIndex + 1}</h6>
                                <div className="d-flex justify-content-center">
                                    <img src={imgUrl1} className="reviewImg" alt="..."></img>
                                </div>
                                <p className="card-text text-center">
                                    <i>{userReviews[props.startIndex + 0]?.review_text || 'User review text'}</i>
                                </p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Customer name: {userReviews[props.startIndex + 0]?.customer_name || 'User name'}{' '}
                                </li>
                                <li className="list-group-item">
                                    Item name: {userReviews[props.startIndex + 0]?.item_name || 'Item name'}{' '}
                                </li>
                                <li className="list-group-item">
                                    Service rating given:{' '}
                                    {iconStars(userReviews[props.startIndex + 0]?.rating) || 'User rating'}{' '}
                                </li>
                                <li className="list-group-item">
                                    Posted: {GenerateDateText(userReviews[props.startIndex + 0]?.post_date)}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-4 my-2 d-flex justify-content-center">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center">Customer testimonial {props.startIndex + 2}</h6>
                                <div className="d-flex justify-content-center">
                                    <img src={imgUrl2} className="reviewImg" alt="..."></img>
                                </div>
                                <p className="card-text text-center">
                                    <i>{userReviews[props.startIndex + 1]?.review_text || 'User review text'}</i>
                                </p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Customer name: {userReviews[props.startIndex + 1]?.customer_name || 'User name'}{' '}
                                </li>
                                <li className="list-group-item">
                                    Item name: {userReviews[props.startIndex + 1]?.item_name || 'Item name'}{' '}
                                </li>
                                <li className="list-group-item">
                                    Service rating given:{' '}
                                    {iconStars(userReviews[props.startIndex + 1]?.rating) || 'User rating'}
                                </li>
                                <li className="list-group-item">
                                    Posted: {GenerateDateText(userReviews[props.startIndex + 1]?.post_date)}{' '}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-4 my-2 d-flex justify-content-center">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="text-center">Customer testimonial {props.startIndex + 3}</h6>
                                <div className="d-flex justify-content-center">
                                    <img src={imgUrl3} className="reviewImg" alt="..."></img>
                                </div>
                                <p className="card-text text-center">
                                    <i>{userReviews[props.startIndex + 2]?.review_text || 'User review text'}</i>
                                </p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Customer name: {userReviews[props.startIndex + 2]?.customer_name || 'User name'}
                                </li>
                                <li className="list-group-item">
                                    Item name: {userReviews[props.startIndex + 2]?.item_name || 'Item name'}{' '}
                                </li>
                                <li className="list-group-item">
                                    Service rating given:{' '}
                                    {iconStars(userReviews[props.startIndex + 2]?.rating) || 'User rating'}
                                </li>
                                <li className="list-group-item">
                                    Posted: {GenerateDateText(userReviews[props.startIndex + 2]?.post_date)}{' '}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
