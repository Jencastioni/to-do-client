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
        text: ''
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
      // url: `${apiUrl}/items`,
      // method: 'POST',
      // headers: {
      //   'Authorization': `Bearer ${this.props.user.token}`
      // },
      // data: { item: this.state.item }
    })
      .then(res => {
        const task = res.data.tasks.find((element) => {
          return element.product === this.state.task.product
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
    //   .catch(error)
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

    // .then(res => this.setState({ createdId: res.data.item._id }))
    // .then(() => msgAlert({
    //   heading: 'Create Item Success',
    //   message: messages.createItemSuccess,
    //   variant: 'success'
    // }))
    // .catch(console.error)
    // .catch(error => {
    //   msgAlert({
    //     heading: 'Create Item Failure' + error.message,
    //     message: messages.createItemFailure,
    //     variant: 'danger'
    //   })
    // })
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
