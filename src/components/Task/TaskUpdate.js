import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UpdateForm from './UpdateForm'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class TaskUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: {
        category: '',
        title: '',
        text: '',
        date: ''
      },
      updated: false
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ task: res.data.task }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedTask = Object.assign({}, prevState.task, updatedField)

      return { task: editedTask }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}/update`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { task: this.state.task }
    })
      .then(res => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Updated Task Successfully',
        message: messages.updateTaskSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Updated Tasks Failed' + error.message,
          message: messages.updateTaskFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { task, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/tasks/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <UpdateForm
          task={task}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/tasks/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default TaskUpdate
