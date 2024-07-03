import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addmovies } from '../Redux/Movieslice';
import Swal from 'sweetalert2';


function AddMovies() {

    const [movieData, setMovieData] = useState({
        title: '',
        description: '',
        releaseDate: '',
        genre: '',
        image: null,
        imageUrl: '',
      });
      console.log(movieData);


      const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
          console.error("No file selected");
          return;
        }
      
        try {

          const imageUrl = URL.createObjectURL(file);

          setMovieData({
            ...movieData,
            image: file,
            imageUrl: imageUrl,
          });

        } catch (error) {
          console.error("Error creating in object URL:", error);
        }
      };


      const dispatch = useDispatch();


      // add movies
  const handleAdd = async (e) => {
    e.preventDefault();

    const { title, description, releaseDate, genre, image, imageUrl } = movieData;

    if (!title || !description || !releaseDate || !genre || !image || !imageUrl) {
      alert('Please fill the form completely');
    } else {
      const reqbody = new FormData();
      reqbody.append('title', title);
      reqbody.append('description', description);
      reqbody.append('releaseDate', releaseDate);
      reqbody.append('genre', genre);

      reqbody.append('image', image);
      reqbody.append('imageUrl', imageUrl);

      
        const reqheader = {
          'Content-Type': 'multipart/form-data'
         
        };

        const resultAction = await dispatch(addmovies({ reqbody, reqheader }));
        if (addmovies.fulfilled.match(resultAction)) {
          Swal.fire({
            icon:'success',
            title: 'Movie added Successfully',
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

        setMovieData({
          title:"",
          description:"",
          releaseDate:"",
          genre:"",
          image:"",
          imageUrl:""

        })
       
      
    }
  };
    
  return (
    <>
      <Container className='d-flex justify-content-center mt-5'>

        <Card className='card shadow' style={{ width: '100%', maxWidth: '600px',borderRadius:'10px' }}>

          <Card.Body>

            <h3 className='text-center mb-4'>Add Movies</h3>

            <Form>
              <Form.Group className='mb-3' controlId='formTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' placeholder='Enter movie title' value={movieData.title} onChange={(e)=>setMovieData({...movieData,title:e.target.value})} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' rows={3} placeholder='Enter movie description' value={movieData.description} onChange={(e)=>setMovieData({...movieData,description:e.target.value})}/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formRelease'>
                <Form.Label>Release Date</Form.Label>
                <Form.Control type='date' value={movieData.releaseDate} onChange={(e)=>setMovieData({...movieData,releaseDate:e.target.value})} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formGenre'>
                <Form.Label>Genre</Form.Label>
                <Form.Control type='text' placeholder='Enter movie genre' value={movieData.genre} onChange={(e)=>setMovieData({...movieData,genre:e.target.value})} />
              </Form.Group>

              
              <Form.Group className='mb-3' controlId='formImage'>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control  type='file' onChange={handleFileChange} />
                {movieData.imageUrl && (
                  <div className='mt-2'>
                    <img src={movieData.imageUrl} alt='Movie' style={{ maxWidth: '100%', height: '400px' }} />
                  </div>
                )}

              </Form.Group>

              <div class="d-flex justify-content-center">

  <Button onClick={handleAdd} className='mt-4' variant='primary' type='submit'>
    Add
  </Button>
</div>


            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AddMovies;
