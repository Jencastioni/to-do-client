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
        <div key={task._id}>
          <Card style={{ width: '30rem', margin: 'auto', textAlign: 'center' }} >
            <Card.Body>
              <div className="task-category">
                {task.category}<br/>
              </div>
              <Link to={`/tasks/${task._id}`}>
                {task.title}
              </Link><br/>
              Date Added: {fullDate}
            </Card.Body>
          </Card>
        </div>
      )
    })

    // return (
    //   // <Layout>
    //   <div className="tasks">
    //     <h3>My Tasks</h3><br/>
    //     <p>Tasks are sorted by Highest Priority, Important, Low Priority to Not Important and by Date within each category.</p>
    //     <p>Completed tasks will be sent to the top so do not forget to delete them!</p><br/>
    //     <ul>
    //       {tasks}
    //     </ul>
    //   </div>
    //   // </Layout>
    // )

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
              <small className="text-muted"><img src="../check.png" height="20"></img>CheckIt</small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    )
  }
}

// <div className='row long'>
// <div className='col-md-8 col-lg-6'>
//   <div className={character.class}>
//     <p>Name:</p><h2>{character.name}</h2>
//     <Link to={`/characters/${this.props.match.params.id}/edit`}>
//       <OutlineButton size="md" variant="dark">Edit Name</OutlineButton>
//     </Link>
//     <OutlineButton size="md" variant= "danger" onClick={this.destroyPost}>Delete Character</OutlineButton>
//   </div>
//   <div className={character.class}>
//     {imageSelector}
//   </div>
// </div>
// <div className='col-md-8 col-lg-6'>
//   <div className={character.class}>
//     <h4>Stats:</h4>
//     <p>Health: {character.health}</p>
//     <p>Strength: {character.strength}</p>
//     <p>Stamina: {character.stamina}</p>
//     <p>Magick: {character.magick}</p>
//     <p>Healing: {character.healing}</p>
//   </div>
//   <div className={character.class}>
//     <h3>Work Outs:</h3>
//     <Link to={`/characters/${this.props.match.params.id}/work-outs`}>
//       <OutlineButton variant="dark">Add Work Out</OutlineButton>
//     </Link>
//   </div>
//   {workOutHtml}
// </div>
// </div>
export default Tasks
