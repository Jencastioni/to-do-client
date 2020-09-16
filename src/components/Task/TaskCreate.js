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
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        const task = res.data.tasks.find((task) => {
          return task.title === this.state.task.title
        })
        if (task) {
          return axios({
            url: `${apiUrl}/tasks/${task._id}/update`,
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${this.props.user.token}`
            },
            data: { task: this.state.task }
          })
        } else {
          return axios({
            url: `${apiUrl}/tasks`,
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.props.user.token}`
            },
            data: { task: this.state.task }
          })
        }
      })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ createdId: res.data.task._id })
        } else if (res.status === 204) {
          this.setState({ updated: true })
        }
      })
      .catch((error) => {
        if (error.response.status === 420) {
          return msgAlert({
            heading: 'You can\'t have negative values 😱',
            message: messages.updateTaskFailure,
            variant: 'danger'
          })
        }
      })
  }

  render () {
    const { task, createdId, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (createdId) {
      return <Redirect to={`/tasks/${createdId}`} />
    } else if (updated) {
      return <Redirect to={'/tasks'} />
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
