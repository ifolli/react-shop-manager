import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Stack } from 'react-bootstrap';

const Item = ({
  id,
  title,
  description,
  price,
  category,
  image,
  rating,
}) => {

  return (
    <Card style={{  }} className='d-flex flex-column h-100 align-items-center justify-content-around'>
      <Card.Img variant='top' src={image} style={{ 'maxHeight': '16rem', 'width': 'auto' }} className="py-3" />
      <Card.Body>
        <Card.Title className='my-3'>{title}</Card.Title>
        <div className="p-1" style={{  }}>
          <dt>Price:</dt><dd>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)}</dd>
          <dt>Category:</dt><dd>{category}</dd>
          <dt>Description</dt>
          <dd style={{  }}>{description}</dd>
          <dt>Rating:</dt>
          <dd>{rating.rate} ({rating.count})</dd>
        </div>
      </Card.Body>
      <Card.Footer className="w-100 py-3">
        <Stack gap={1} className="mb-3">
          <Button variant='primary' href={`/item/${id}`}>
            Edit
          </Button>
          <Button disabled variant='danger'>
            Delete
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default Item;