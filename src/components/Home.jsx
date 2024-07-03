import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies } from '../Redux/Movieslice';
import { BASE_URL } from '../services/baseurl';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { bouncy } from 'ldrs'



bouncy.register()



function Home() {
  const navigate = useNavigate();


  const [watchedStatus, setWatchedStatus] = useState(() => {


    const savedStatus = localStorage.getItem('watchedStatus');
    return savedStatus ? JSON.parse(savedStatus) : {};
  });

  const dispatch = useDispatch();
  const { films, status, error } = useSelector((state) => state.films);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMovies());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="d-flex justify-content-center align-items-center vh-100">
    <l-bouncy
      size="85"
      speed="1.75"
      color="white"
    ></l-bouncy>
  </div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }


 


  const handleToggle = (id) => {
    setWatchedStatus((prevStatus) => {
      const newStatus = { ...prevStatus, [id]: true };

    
      localStorage.setItem('watchedStatus', JSON.stringify(newStatus));

      return newStatus;
    });
  };

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
          {films && films.length > 0 ? (
            films.map((item) => (
              <div className='col-12 col-md-6 col-lg-3 mb-4' key={item._id}>
                
                <Card style={{ width: '18rem', borderRadius: '10px' }}>
                  <Card.Img style={{ borderRadius: '10px' }} variant="top" src={`${BASE_URL}/uploads/${item.image}`} />
                  <Card.Body>

                    <div className='row'>

                      <div className='col-6'>
                        <Button variant="warning" onClick={() => handleCardClick(item)}>
                          More info
                        </Button>
                      </div>
                      <div className='col-6'>

                        <label className='mt-2'>
                          <input
                            className='text-warning'
                            type="checkbox"
                            checked={watchedStatus[item._id] || false}
                            onChange={() => handleToggle(item._id)}
                            disabled={watchedStatus[item._id]} 
                          />

                          {watchedStatus[item._id] ? 'Watched' : 'Unwatched'}
                        </label>
                      </div>

                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
