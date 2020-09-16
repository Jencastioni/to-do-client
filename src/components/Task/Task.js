import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

// Import axios so we can make HTTP requests
import axios from 'axios'

class Task extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our item state will be null, until the API request finishes
      task: null,
      // initially this item has not been deleted yet
      deleted: false,
      redirect: false
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { task: this.state.task }
    })
      .then(res => this.setState({ task: res.data.task }))
      .then(() => msgAlert({
        heading: 'Success!',
        message: messages.showTaskSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Show Task Failed' + error.message,
          message: messages.showTaskFailure,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  handleClick = () => {
    this.setState({ redirected: true })
  }

  destroyTask = () => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      // update the `deleted` state to be `true`
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Task Successfully',
        message: messages.deleteTaskSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Delete Task Failure' + error.message,
          message: messages.deleteTaskFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { task, deleted, redirected } = this.state

    if (!task) {
      return <p>Loading...</p>
    }

    // if the deleted state is true
    if (deleted) {
      // redirect to the home page
      return <Redirect to={{
        // Redirect to the home page ('/')
        pathname: '/tasks',
        // Pass along a message, in state, that we can show
        state: { msgAlert: 'Deleted task successfully' }
      }} />
    }

    if (redirected) {
      return <Redirect to={{ pathname: '/tasks-create' }} />
    }

    const date = new Date(task.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate() + 1
    const fullDate = month + '/' + day + '/' + year
    return (
      <div className="task">
        <h6>{task.category}</h6><br/>
        <p> </p>
        <p>{task.title}</p>
        <p>{task.text}</p>
        <p>Date Added: {fullDate}</p>
        <button onClick={this.handleClick}>Edit</button>
        <button onClick={this.destroyTask}>Delete</button><br/>
        {/* <Link to={`/tasks/${this.props.match.params.id}/update`}>
          <button>Update</button>
        </Link> */}
        <p></p><br/>
        <Link to='/tasks'>Back to all tasks 📋</Link>
      </div>
    )
  }
}

export default Task
