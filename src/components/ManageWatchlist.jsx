import React, { useEffect } from 'react';
import { Card, Table, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies, deleteMovie } from '../Redux/Movieslice'; 
import Edit from './Edit';
import Swal from 'sweetalert2';


function ManageWatchlist() {
  const dispatch = useDispatch();
  const { films, status, error } = useSelector((state) => state.films);
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'deleted') {
      dispatch(fetchAllMovies());
    }
  }, [status, dispatch]);

 
// delete function
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this movie!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMovie(id));
        Swal.fire(
          'Deleted!',
          'Your movie has been deleted.',
          'success'
        );
      }
    });
  };

  
  return (
    <div>
      <Container className='d-flex justify-content-center mt-5'>
        <Card className='card shadow' style={{ width: '100%', maxWidth: '950px', borderRadius: '10px' }}>

          <Card.Body>
            <h3 className='text-center mb-4'>Manage Watchlist</h3>

            <Table striped bordered hover size="lg" style={{ borderRadius: '10px' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Movie Title</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>

              </thead>
              <tbody>
                {films && films.length > 0 ? (
                  films.map((item, index) => (

                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td><Edit project={item} /></td>
                      <td>
                        <i
                          className="fa-solid fa-trash ms-3"
                          style={{ cursor: 'pointer',color:'#a00004' }}
                          onClick={() => handleDelete(item._id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No movies found</td>
                  </tr>

                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ManageWatchlist;
