import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Layout from '../shared/Layout'

// import the api's url
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

// Import axios so we can make HTTP requests
import axios from 'axios'

class Tasks extends Component {
  constructor (props) {
    super(props)

    // setup our initial state
    this.state = {
      // we have zero tasks, until our API request has finished
      tasks: []
      // deleted: false
    }
  }

  // this is called whenever our component is created and inserted
  // into the DOM (first appears)
  componentDidMount () {
    // make a GET request for all of the tasks
    const { msgAlert } = this.props
    axios({
      url: (`${apiUrl}/tasks`),
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({ tasks: res.data.tasks })
      })
      // .then((res) => {
      //   this.setState({ tasks: res.data.tasks })
      //   console.log(res.data)
      //   if (res.data.tasks.length === 0) {
      //     msgAlert({
      //       heading: 'Your To Do List is Empty!',
      //       message: messages.inventoryEmpty,
      //       variant: 'danger'
      //     })
      //   } else if (res) {
      //     msgAlert({
      //       heading: 'Success!',
      //       message: messages.indexTaskSuccess,
      //       variant: 'success'
      //     })
      //   }
      // })
      .catch(error => {
        msgAlert({
          heading: 'Indexing Tasks Failed' + error.message,
          message: messages.indexTaskFailure,
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
        <li key={task._id}>
          <Link to={`/tasks/${task._id}`}>
            {task.title}
          </Link><br/>
          <p>Text: {task.text}</p>
          <p>Date Added: {fullDate}</p>
        </li>
      )
    })

    return (
      // <Layout>
      <div className="tasks">
        <h6>Tasks</h6><br/>
        <p> </p>
        <p> </p>
        <ul>
          {tasks}
        </ul>
      </div>
      // </Layout>
    )
  }
}

export default Tasks
