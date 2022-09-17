import React, { useReducer, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import Spinner from './Spinner';

import { useCategories } from '../hooks/category';
import { updateItem, useItem, useLastItemUpdateTs, validateItemInputs } from '../hooks/item';

const initialState = {}

const EditItemForm = () => {
    // In a larger app, this would share more logic with the AddItemForm
    // (and/or all forms in the app in general)
    const { id } = useParams()
    const [externalItem, loading] = useItem(id);
    const [item, updateInternalItem] = useReducer(
        (item, updates) => ({ ...item, ...updates }),
        initialState,
    );
    const [categories, categoriesLoading] = useCategories();
    const [submitting, setSubmitting] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    if (externalItem && item === initialState) {
        console.log('Updating!', externalItem)
        updateInternalItem(externalItem)
    }
    const [_, setLastUpdateTs] = useLastItemUpdateTs();
    const [validationErrs, setValidationErrs] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault()
        const errs = validateItemInputs(item)
        setValidationErrs(errs)
        if (errs.length === 0) {
            setSubmitting(true)
            await updateItem(id, item).then((success) => {
                setUpdateSuccess(success)
                if (success) {
                    setLastUpdateTs(new Date())
                }
            })
            setSubmitting(false)
        }
    }
    const getButtons = () => {
        // The buttons at the bottom of the form are typically submit/cancel/go back
        // Here we define what buttons to show in each stage of the typical API request cycle
        // Define common interface here
        var k = 0;
        const buttonHtml = (content, variant, onClick, disabled=false, href=null) => <Col key={k++} sm={12} md={3}><Button type="button" variant={variant} onClick={onClick} disabled={disabled} href={href} className="w-100">{content}</Button></Col>
        var buttons = []
        if (submitting) {
            buttons.push(buttonHtml(<Spinner />, "primary", null, true))
        } else if (updateSuccess) {
            // Should make some of these clickable to go away or auto-fade
            buttons.push(buttonHtml("Updated successfully!", "success", null, true))
        } else {
            buttons.push(buttonHtml("Submit", "primary", handleSubmit))
        }
        if (updateSuccess === false) {
            buttons.push(buttonHtml("Update failed!", "danger", null, true))
        }
        buttons.push(...validationErrs.map((e) => buttonHtml(e, 'danger', null, true)))
        buttons.push(buttonHtml("Back to listing page", "light", null, false, "/"))
        return buttons
    }
    return (
        <React.Fragment>
        <Form className="p-3">
            <Row>
                <Col>
                    <h1>Edit Item: {id}</h1>
                </Col>
            </Row>
            {(loading || externalItem === null || item === null) ? <Spinner /> : (
                <React.Fragment>
                <Form.Group as={Row} className="mb-1" controlId="title">
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10} md={8}>
                        <Form.Control required type="text" minLength={3} value={item.title} onChange={(e) => updateInternalItem({ title: e.target.value })} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="category">
                    <Form.Label column sm={2}>Category</Form.Label>
                    <Col sm={10} md={8}>
                    { (categoriesLoading) ? (
                        <Spinner />
                    ) : (
                        <Form.Select value={item.category} onChange={(e) => updateInternalItem({ category: e.target.value })}>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </Form.Select>
                    )}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="description">
                    <Form.Label column sm={2}>Description</Form.Label>
                    <Col sm={10} md={8}>
                    <Form.Control
                        required as="textarea"
                        style={{'minHeight': '8rem'}}
                        value={item.description} onChange={(e) => updateInternalItem({ description: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="price">
                    <Form.Label column sm={2}>Price</Form.Label>
                    <Col sm={10} md={8}>
                    <Form.Control required type="number" value={item.price} onChange={(e) => updateInternalItem({ price: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="image">
                    <Form.Label column sm={2}>Image</Form.Label>
                    <Col sm={10} md={8}>
                    <Form.Control disabled type="text" name="image" value={item.image} />
                    <Form.Control type="file" name="image_upload" />
                    </Col>
                {/* <img src={image} /> */}
                </Form.Group>
                <Row className="p-5">
                    {getButtons()}
                </Row>
                </React.Fragment>
            )}
            </Form>
        </React.Fragment>
    )
}

export default EditItemForm