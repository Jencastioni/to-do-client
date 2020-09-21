import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import TaskForm from './TaskForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class TaskCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: {
        category: '',
        title: '',
        text: '',
        date: ''
      },
      createdId: null,
      updated: false
    }
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedTask = Object.assign({}, prevState.task, updatedField)
      return { task: editedTask }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/tasks`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { task: this.state.task }
    })
      .then(res => this.setState({ createdId: res.data.task._id }))
      .then(console.log(this.state))
      .then(() => msgAlert({
        heading: 'Created Task Successfully',
        message: messages.createTaskSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Created Tasks Failed' + error.message,
          message: messages.createTaskFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { task, createdId } = this.state
    const { handleChange, handleSubmit } = this

    if (createdId) {
      return <Redirect to={`/tasks/${createdId}`} />
    }

    return (
      <div>
        <TaskForm
          task={task}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath='/'
        />
      </div>
    )
  }
}

export default TaskCreate
