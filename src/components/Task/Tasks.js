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
      // .then(res => {
      //   if (res.data.tasks === []) {
      //     msgAlert({
      //       heading: 'Your To Do List is Empty!',
      //       message: messages.inventoryEmpty,
      //       variant: 'danger'
      //     })
      //   }
      // }
      // )
      .then((res) => {
        this.setState({ tasks: res.data.tasks })
        if (res.data.tasks.length === 0) {
          msgAlert({
            heading: 'Your To Do List is Empty!',
            message: messages.inventoryEmpty,
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
      // .then((tasks) => {
      //   if (tasks === []) {
      //     msgAlert({
      //       heading: 'Your Inventory Is Empty!',
      //       message: messages.inventoryEmpty,
      //       variant: 'danger'
      //     })
      //   } else if (tasks) {
      //     msgAlert({
      //       heading: 'Success!',
      //       message: messages.indexTasksSuccess,
      //       variant: 'success'
      //     })
      //   }
      // }
      // )
      // .then((tasks) => msgAlert({
      //   heading: 'Success!',
      //   message: messages.indexTaskSuccess,
      //   variant: 'success'
      // }))
      .catch(error => {
        msgAlert({
          heading: 'Indexing Tasks Failed' + error.message,
          message: messages.indexTaskFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const tasks = this.state.tasks.map(task => (
      <li key={tasks._id}>
        <Link to={`/tasks/${task._id}`}>
          {task.title}
        </Link><br/>
        <p>Text: {task.text}</p>
      </li>
    ))
    // if (tasks === true) {
    //   return msgAlert({
    //     heading: 'Updated Task Successfully',
    //     message: messages.updateTaskSuccess,
    //     variant: 'success'
    //   })
    // }
    return (
      // <Layout>
      <div className="tasks">
        <h7>Tasks</h7><br/>
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
