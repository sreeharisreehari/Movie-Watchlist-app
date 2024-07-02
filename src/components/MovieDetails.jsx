import React from 'react';
import './MovieDetails.css';
import { useParams, useLocation } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';

function MovieDetails() {
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

          <span>★</span><span>★</span><span>★</span><span>☆</span><span>☆</span>

        </div>

        <div className="review">

          <label htmlFor="review">Write a review:</label>

          <textarea id="review" rows="4"></textarea>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
