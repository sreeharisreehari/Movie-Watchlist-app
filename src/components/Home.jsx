import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
function Home() {
  return (
    <div>
<section>
  
        <h3 className='text-center mt-5'>My Watchlist</h3>
</section>
    <div className='container'>
        <div className='row mt-5'>
            <div className='col-12 col-md-6 col-lg-3 mb-4'>
  
            <Card style={{ width: '18rem',borderRadius:'10px' }}>
      <Card.Img style={{borderRadius:'10px'}} variant="top" src="https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2021/08/19085635/gEU2QniE6E77NI6lCU6MxlNBvIx-scaled.jpg" />
      <Card.Body>
<Card.Link href="#">Card Link</Card.Link>
<Card.Link href="#">Another Link</Card.Link>
</Card.Body>
    </Card>
            </div>
            <div className='col-12 col-md-6 col-lg-3 mb-4'>
  
            <Card style={{ width: '18rem',borderRadius:'10px' }}>
      <Card.Img style={{borderRadius:'10px'}} variant="top" src="https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2021/08/19085635/gEU2QniE6E77NI6lCU6MxlNBvIx-scaled.jpg" />
      <Card.Body>
<Card.Link href="#">Card Link</Card.Link>
<Card.Link href="#">Another Link</Card.Link>
</Card.Body>
    </Card>
  </div>
  <div className='col-12 col-md-6 col-lg-3 mb-4'>
  
  <Card style={{ width: '18rem',borderRadius:'10px' }}>
      <Card.Img style={{borderRadius:'10px'}} variant="top" src="https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2021/08/19085635/gEU2QniE6E77NI6lCU6MxlNBvIx-scaled.jpg" />
      <Card.Body>
<Card.Link href="#">Card Link</Card.Link>
<Card.Link href="#">Another Link</Card.Link>
</Card.Body>
    </Card>
  </div>
  <div className='col-12 col-md-6 col-lg-3 mb-4'>
  
  <Card style={{ width: '18rem',borderRadius:'10px' }}>
      <Card.Img style={{borderRadius:'10px'}} variant="top" src="https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2021/08/19085635/gEU2QniE6E77NI6lCU6MxlNBvIx-scaled.jpg" />
      <Card.Body>
<Card.Link href="#">Card Link</Card.Link>
<Card.Link href="#">Another Link</Card.Link>
</Card.Body>
    </Card>
  </div>
        </div>
    </div>
    </div>
  )
}

export default Home