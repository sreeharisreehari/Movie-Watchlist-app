import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updatemovie } from '../Redux/Movieslice';
import { BASE_URL } from '../services/baseurl';

const Edit = ({ movie }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    genre: '',
    image: null,
    imageUrl: '',
  });

  useEffect(() => {
    if (movie) {
      setMovieData({
        title: movie.title,
        description: movie.description,
        releaseDate: movie.releaseDate,
        genre: movie.genre,
        image: null,
        imageUrl: movie.imageUrl,
      });
    }
  }, [movie]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setMovieData({
      ...movieData,
      image: file,
      imageUrl: imageUrl,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqbody = new FormData();
    reqbody.append('title', movieData.title);
    reqbody.append('description', movieData.description);
    reqbody.append('releaseDate', movieData.releaseDate);
    reqbody.append('genre', movieData.genre);
    if (movieData.image) {
      reqbody.append('image', movieData.image);
    }

    const reqheader = {
      'Content-Type': 'multipart/form-data',
    };

    dispatch(updatemovie({ id: movie.id, reqbody, reqheader }));
    handleClose();
  };

  return (
    <>
      <i onClick={handleShow} className="fa-solid fa-pen-to-square ms-3"></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-items-center">
              <label htmlFor="image" className="d-flex flex-column align-items-center">
                <input
                  id="image"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <img
                  className=""
                  src={`${BASE_URL}/uploads/${movie.image}`}
                  alt=""
                  width="140px"
                  height="180px"
                />
              </label>
            </div>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter movie title"
                value={movieData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter movie description"
                value={movieData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formReleaseDate">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                name="releaseDate"
                value={movieData.releaseDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                placeholder="Enter movie genre"
                value={movieData.genre}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button className="mt-4" variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
