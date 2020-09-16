import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const TaskForm = ({ task, handleSubmit, handleChange, cancelPath }) => (

  <div className="updates">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <h6>Task</h6><br/>
        {/* <p> </p> */}
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" value={task.category} name='category' onChange={handleChange}>
          <option>Choose a category...</option>
          <option>Completed</option>
          <option>High Priority</option>
          <option>Low Priority</option>
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
        <Form.Label>Date Added</Form.Label>
        <Form.Control type="date" placeholder="Date" value={task.date} name='date' onChange={handleChange}/>
      </Form.Group>
      <button type='submit'>Submit</button>
      <Link to={cancelPath}>
        <button>Cancel</button>
      </Link><br/>
      <p>*All Fields Required.</p>
    </Form>
  </div>
)
export default TaskForm
