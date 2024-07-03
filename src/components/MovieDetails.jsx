import React, { useState } from 'react';
import './MovieDetails.css';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addReviewss } from '../Redux/Movieslice';


function MovieDetails() {


  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: ''
  });
console.log(reviewData);


const dispatch = useDispatch();

  const handleAddReview = async (e) => {
    e.preventDefault();

    const { review,rating } = reviewData;

   
      const reqbody = new FormData();
      reqbody.append('review', review);
      reqbody.append('rating', rating);
     

      
        const reqheader = {
          'Content-Type': '"application/json"'
         
        };

        const resultAction = await dispatch(addReviewss({ reqbody, reqheader }));
        if (addReviewss.fulfilled.match(resultAction)) {
          Swal.fire({
     
            title: 'Thankyou for your response!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })

          
        } else {
          alert(resultAction.payload);
        }
        setReviewData({
          review:"",
          rating:""
         

        })
       
      
    
  };



  // Function to handle click on a star
  const handleRatingClick = (value) => {
    setReviewData((prevData) => ({
      ...prevData,
      rating: value
    }));
  };





 

  // const { id } = useParams();
  const { state } = useLocation();
  const item = state?.item;

  if (!item) {
    return <p>No movie details available.</p>;
  }

  

  
  return (
   
    <div className="movie-details mt-5 cardshadow">
      <div className="movie-image card shadow ">
        <img src={`${BASE_URL}/uploads/${item.image}`} alt="Movie Poster" />
      </div>
      <div className="moviee-info">

        <h1>{item.title}</h1>

        <p>{item.description}</p>

        <p><strong>Release Date:</strong> {item.releaseDate}</p>

        <p><strong>Genre:</strong> {item.genre}</p>

        <div className="rating">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <span
            key={starValue}
            onClick={() => handleRatingClick(starValue)}
            style={{ cursor: 'pointer', color: starValue <= reviewData.rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
          
        ))}
               <b> <p className='mt-3 ms-3 text-warning'>{reviewData.rating}</p></b>

      </div>
        <div className="review">

          <label htmlFor="review">Write a review:</label>

          <textarea
        id="review"
        rows="4"
        value={reviewData.review}
      onChange={(e)=>setReviewData({...reviewData,review:e.target.value})}
      ></textarea>
      <div>
      </div>          <Button onClick={handleAddReview} variant="primary" >
           Send
          </Button>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
