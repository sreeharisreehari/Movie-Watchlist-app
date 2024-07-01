import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';

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

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setMovieData({
          ...movieData,
          image: file,
          imageUrl: imageUrl,
        });
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
                <Form.Control type='text' placeholder='Enter movie title' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' rows={3} placeholder='Enter movie description' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formRelease'>
                <Form.Label>Release Date</Form.Label>
                <Form.Control type='date' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formGenre'>
                <Form.Label>Genre</Form.Label>
                <Form.Control type='text' placeholder='Enter movie genre' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formImage'>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control  type='file' onChange={handleFileChange} />
                {movieData.imageUrl && (
                  <div className='mt-2'>
                    <img src={movieData.imageUrl} alt='Movie' style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                )}
              </Form.Group>
              <div class="d-flex justify-content-center">
  <Button className='mt-4' variant='primary' type='submit'>
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
