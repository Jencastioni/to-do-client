import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Layout from '../shared/Layout'

// import the api's url
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

// Import axios so we can make HTTP requests
import axios from 'axios'

import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'

class Tasks extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props
    axios({
      url: (`${apiUrl}/tasks`),
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ tasks: res.data.tasks })
        if (res.data.tasks.length === 0) {
          msgAlert({
            heading: 'You Don\'t Have Any Tasks Yet!',
            message: messages.taskEmpty,
            variant: 'danger'
          })
        } else if (res) {
          msgAlert({
            heading: 'Success!',
            message: messages.indexTaskSuccess,
            variant: 'success'
          })
        }
      })
      .catch(error => {
        msgAlert({
          heading: 'Indexing Tasks Failed' + error.message,
          message: messages.indexTaskFailure,
          variant: 'danger'
        })
      })
  }

  destroyTask = (taskId) => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/tasks/${taskId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => {
        return axios({
          url: (`${apiUrl}/tasks`),
          headers: {
            'Authorization': `Bearer ${this.props.user.token}`
          }
        })
      })
      .then((res) => this.setState({ tasks: res.data.tasks }))
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
    const tasks = this.state.tasks.map(task => {
      const date = new Date(task.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate() + 1
      const fullDate = month + '/' + day + '/' + year
      return (
        <div key={task._id}>
          <Card style={{ width: '30rem', margin: 'auto', textAlign: 'center' }} >
            <Card.Body>
              <div className="task-category">
                <button type="button" className="delete-button" onClick={() => this.destroyTask(task._id)}>X</button>
                {task.category}<br/>
              </div>
              <Link to={`/tasks/${task._id}`}>
                {task.title}
              </Link><br/>
              Due Date: {fullDate}
            </Card.Body>
          </Card>
        </div>
      )
    })

    // Boostrap cards
    return (
      <div className="tasks">
        <CardGroup>
          <Card>
            <Card.Body className="cardbody">
              <Card.Title className="card-title">Tasks</Card.Title><br/>
              <Card.Text>
                Tasks are sorted by Highest Priority, Important, Low Priority to Not Important.<br/>
                They are then sorted by Date (oldest to newest) within each category.<br/>
                Completed tasks will be sent to the top so do not forget to delete them!
              </Card.Text><br/>
              {tasks}
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"><img src="check.png" height="20"></img>CheckIt</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    )
  }
}

export default Tasks
