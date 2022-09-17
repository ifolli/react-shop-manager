import React, { useState } from 'react';
import _ from 'lodash';
import { Button, ButtonGroup, Container, Col, Form, Row, Spinner } from 'react-bootstrap';

import Item from './Item';

import { useItems } from '../hooks/item'
import { useCategories } from '../hooks/category';

const ItemsList = () => {
    const [items, itemsLoading] = useItems();
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [categories, categoriesLoading] = useCategories();
    var filteredItems = items.filter((item) => !categoryFilter || item.category === categoryFilter);
    const [searchText, setSearchText] = useState('');
    filteredItems = filteredItems.filter((item) => !searchText || item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    return (
        <React.Fragment>
            <Form>
                <Row className="justify-content-md-center">
                <Col xs lg="2">
                <Form.Group className="my-3" controlId="search">
                    <Form.Label>
                        <Form.Control type="text" placeholder='Search items...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </Form.Label>
                </Form.Group>
                </Col>
                <Col md="auto">
                <Form.Group className="my-3" controlId="category"> 
                <ButtonGroup className="mb-3">
                    {categoriesLoading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                         </Spinner>
                    ) : categories.map((category) => <Button key={category} className={category === categoryFilter ? "active" : ""} onClick={() => setCategoryFilter(category)}>{category}</Button>)}
                </ButtonGroup>
                </Form.Group>
                </Col>
                </Row>
            </Form>
            <Container>
                <Row>
                {itemsLoading ? (
                    <Col sm={12}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                ) : !_.isEmpty(filteredItems) ? (
                    filteredItems.map((item) => (
                        <Col sm={12} md={6} lg={4} className="mb-3">
                            <Item key={item.id} {...item} />
                        </Col>
                    ))
                    ) : (
                        <p className="message">No items available matching that query.</p>
                        )}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default ItemsList;