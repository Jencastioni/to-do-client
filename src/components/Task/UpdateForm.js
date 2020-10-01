import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const UpdateForm = ({ task, handleSubmit, handleChange, handleCheck, cancelPath }) => (

  <div className="updates">
    <Form className="updateForm" onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <h3>Task</h3><br/>
        <Form.Label>Priority Level</Form.Label>
        <Form.Control as="select" value={task.category} name='category' onChange={handleChange}>
          <option>Choose a Priority Level...</option>
          <option>1-Important and Urgent</option>
          <option>2-Important and Not Urgent</option>
          <option>3-Urgent and Not Important</option>
          <option>4-Not Urgent and Not Important</option>
          <option>Completed</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>{task.title}</Form.Label>
        <Form.Control type="text" placeholder="ex: Today's Chores" value={task.title} name='title' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect3">
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" placeholder="ex: Fold Laundry" value={task.text} name='text' onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect4">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" placeholder="Date" value={task.date} name='date' onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="formGridCheckbox">
        <Form.Check name="checkBox" type="checkbox" label="Completed" defaultChecked={task.checkBox} onChange={handleCheck} />
      </Form.Group>
      <button type='submit' className="btn btn-primary">Submit</button>
      <Link to={cancelPath}>
        <button type="button" className="btn btn-dark">Cancel</button>
      </Link><br/>
    </Form>
  </div>
)
export default UpdateForm
