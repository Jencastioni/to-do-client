import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const TaskForm = ({ task, handleSubmit, handleChange, cancelPath }) => (

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
          <option>0-Completed</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Title</Form.Label>
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
      <button type='submit' className="btn btn-primary">Submit</button>
      <Link to={cancelPath}>
        <button type="button" className="btn btn-dark">Cancel</button>
      </Link><br/>
      <p>*All Fields Required*</p>
    </Form>
  </div>
)
export default TaskForm
