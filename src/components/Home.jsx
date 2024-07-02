import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllMovies } from '../Redux/Movieslice';
import { BASE_URL } from '../services/baseurl';
import { useNavigate } from 'react-router-dom';
function Home() {



  const dispatch = useDispatch();
  const { films } = useSelector((state) => state.films);

  const navigate = useNavigate();



  useEffect(() => {
      dispatch(fetchAllMovies());

  }, [dispatch]);

 

  console.log(films);

  const handleCardClick = (item) => {
    navigate(`/moviedetails/${item._id}`, { state: { item } });
  };

  return (
    <div>
<section>
  
        <h3 className='text-center mt-5'>My Watchlist</h3>
</section>
    <div className='container'>
        <div className='row mt-5'>
         
            {
              films && films.length > 0? (
              films.map((item)=>(
            <div className='col-12 col-md-6 col-lg-3 mb-4'>
  
           
            
                <Card key={item._id} style={{ width: '18rem',borderRadius:'10px' }} onClick={() => handleCardClick(item)}>
        <Card.Img style={{borderRadius:'10px'}} variant="top" src={`${BASE_URL}/uploads/${item.image}`} />
        <Card.Body>
  <Card.Link href="#">{item.title}</Card.Link>
  <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
      </Card>
             
  
  </div>
    ))
  ):null
    }

        </div>
    </div>
    </div>
  )
}

export default Home