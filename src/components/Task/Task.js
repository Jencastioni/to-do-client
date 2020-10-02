import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'

class Task extends Component {
  constructor (props) {
    super(props)

    this.state = {
      task: null,
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

  handleCheck = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { checkBox: !prevState.task.checkBox }
      const editedTask = Object.assign({}, prevState.task, updatedField)
      console.log(this.setState)
      return { task: editedTask }
    })
  }

  componentDidUpdate () {
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}/update`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { category: this.state.task.category.options[4] }
    })
  }

  // TRIAL:S
  // handleCheck = prevState => {
  //   event.persist()
  //   this.setState(prevState)
  // }
  // componentDidUpdate = prevState => {
  //   if (prevState !== this.state) {
  //     this.setState(prevState => {
  //       const updatedField = { checkBox: !prevState.task.checkBox }
  //       const editedTask = Object.assign({}, prevState.task, updatedField)
  //       console.log(this.setState)
  //       return { task: editedTask }
  //     })
  //   }
  // }

  // handleCheck = event => {
  //   event.persist()
  //   this.setState(prevState => {
  //     const updatedField = { checkBox: !prevState.task.checkBox }
  //     const editedTask = Object.assign({}, prevState.task, updatedField)
  //     console.log(editedTask)
  //     if (this.state.task.checkBox) {
  //       axios({
  //         url: `${apiUrl}/tasks/${this.props.match.params.id}/update`,
  //         method: 'PATCH',
  //         headers: {
  //           'Authorization': `Bearer ${this.props.user.token}`
  //         },
  //         data: { category: this.state.task.category.options[4] }
  //       })
  //         .then(() => this.setState({ options: 'Completed' }))
  //         .catch(console.error)
  //     }
  //     return { task: editedTask }
  //   })
  // if (this.state.task.checkBox) {
  //   axios({
  //     url: `${apiUrl}/tasks/${this.props.match.params.id}/update`,
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `Bearer ${this.props.user.token}`
  //     },
  //     data: { category: this.state.task.category.options[4] }
  //   })
  // }
  // }

  destroyTask = () => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/tasks/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
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
    const { task, deleted, redirected, checkBox } = this.state

    if (!task) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={{
        pathname: '/tasks',
        state: { msgAlert: 'Deleted task successfully' }
      }} />
    }

    if (checkBox) {
      return <Redirect to={{ pathname: `/tasks/${this.props.match.params.id}/update` }} />
    }

    if (redirected) {
      return <Redirect to={{ pathname: `/tasks/${this.props.match.params.id}/update` }} />
    }

    const date = new Date(task.date)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate() + 1
    const fullDate = month + '/' + day + '/' + year
    return (
      <div className="task">
        <button type="button" className="delete-button" onClick={this.destroyTask}>X</button><br/>
        <h6>{task.category}</h6><br/>
        <p>{task.title}</p>
        <p>{task.text}</p>
        <p>Due Date: {fullDate}</p>
        <button type="button" className="btn btn-primary" onClick={this.handleClick}> Edit </button>
        <p><input name="checkBox" type="checkbox" label="checkbox" onClick={this.handleCheck} className="checkbox" defaultChecked={task.checkBox} /></p>
        <p></p><br/>
        <Link className="back" to='/tasks'>Back to all tasks <img src="clipboard.png" height="40"></img></Link>
      </div>
    )
  }
}

export default Task
