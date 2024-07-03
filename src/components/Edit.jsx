import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updatemovie } from '../Redux/Movieslice';
import { BASE_URL } from '../services/baseurl';
import Swal from 'sweetalert2';



function Edit({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


 


  const [preview,setpreview]=useState("")

  const [movieDetails,setmovieDetails]=useState({
    id:project._id,
      title:project.title,
      description:project.description,
      releaseDate :project.releaseDate,
      genre :project.genre,
      image:""
      



  })
  console.log(movieDetails);

  

 
  const dispatch = useDispatch();

  const { status, error } = useSelector(state => state.films); 

  useEffect(() => {
    if (movieDetails.image) {
      setpreview(URL.createObjectURL(movieDetails.image));
    }
  }, [movieDetails.image]);


  // edit movies
  const handleUpdate = async () => {
    const { id, title,  description,  releaseDate,   genre, image } = movieDetails;

    if (!title || ! description || ! releaseDate || !  genre ) {
      alert('Please fill the form completely');
    } else {
      const reqbody = new FormData();

      reqbody.append("title", title);
      reqbody.append(" description",  description);
      reqbody.append(" releaseDate",  releaseDate);
      reqbody.append("genre",   genre);

      preview ? reqbody.append("image", image) : reqbody.append("image", project.image);

      const reqheader = {
        "Content-Type": preview ? "multipart/form-data" : "application/json",
      };

      const resultAction = await dispatch(updatemovie({id, reqbody, reqheader }));

      if (updatemovie.fulfilled.match(resultAction)) {
        Swal.fire({
          icon:'success',
          title: 'Updated Successfully',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        handleClose()
        
      } else {
        alert(resultAction.payload);
      }
    
  }
};




  return (
    <>
      <i onClick={handleShow} class="fa-solid fa-pen-to-square  ms-3"></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movies</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form>

        <div class="d-flex justify-content-center align-items-center" >
  <label htmlFor="imag" class="d-flex flex-column align-items-center">
    <input 
      id='imag' 
      type="file" 
      style={{ display: 'none' }} 
      onChange={(e)=>setmovieDetails({...movieDetails,image:e.target.files[0]})} 

    />
    <img 
      className='' 
      alt=""  
      width='140px' 
      height='180px' 
      src={preview?preview:`${BASE_URL}/uploads/${project.image}`}
    />
  </label>
</div>

              <Form.Group className='mb-3' controlId='formTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' placeholder='Enter movie title' value={movieDetails.title} onChange={(e)=>setmovieDetails({...movieDetails,title:e.target.value})} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' rows={3} placeholder='Enter movie description' value={movieDetails.description} onChange={(e)=>setmovieDetails({...movieDetails,description:e.target.value})} />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formRelease'>
                <Form.Label>Release Date</Form.Label>
                <Form.Control type='date' value={movieDetails.releaseDate} onChange={(e)=>setmovieDetails({...movieDetails,releaseDate:e.target.value})}/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formGenre'>
                <Form.Label>Genre</Form.Label>
                <Form.Control type='text' placeholder='Enter movie genre' value={movieDetails.genre} onChange={(e)=>setmovieDetails({...movieDetails,genre:e.target.value})}/>
              </Form.Group>

             
             
             

            </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;