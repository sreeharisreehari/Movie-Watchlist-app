import React, { useEffect } from 'react'
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { CiEdit } from "react-icons/ci";
import Edit from './Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies } from '../Redux/Movieslice';


function ManageWatchlist() {

    const dispatch = useDispatch();
    const { films } = useSelector((state) => state.films);
  
    
  
    useEffect(() => {
        dispatch(fetchAllMovies());
  
    }, [dispatch]);
  
   
  
    console.log(films);
  return (
    <div>

<Container className='d-flex justify-content-center mt-5'>
        <Card className='card shadow' style={{ width: '100%', maxWidth: '950px',borderRadius:'10px' }}>
          <Card.Body>
            <h3 className='text-center mb-4'>Manage Watchlist</h3>
            <Table striped bordered hover size="lg" style={{borderRadius:'10px'}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Movie Title</th>
         <th></th>
         <th></th>
        </tr>
      </thead>
      <tbody>
        {
         films && films.length> 0 ? (
films.map((item,index)=>(
        
            <tr>
          <td>{index+1}</td>
          <td>{item.title}</td>
          <td><Edit movie={item}/></td>
          <td><i class="fa-solid fa-trash ms-3"></i></td>
        </tr>
        ))
    ):null
        
    }
       
      </tbody>
    </Table>
           
          </Card.Body>
        </Card>
      </Container>


    </div>
  )
}

export default ManageWatchlist