import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class About extends Component {
  render () {
    return (
      <div className="task">
        <h3>About CheckIt</h3><br/>
        <p>CheckIt is a simple task manager app that allows you to stay on top of the things you need to do.</p><br/>

        <p>You should not have to read a manual to use an app that helps you stay organized. CheckIt is a simple way to allow you to manage your tasks. By using the famous Eisenhower Matrix, you choose your priority levels and check each task off as you complete it.</p>
        <img src="../matrix.png" height="450"></img>
        <p></p><br/>
        <h3 className="about">Getting Started</h3>
        <br/><p>Tasks are sorted by Highest Priority, Important, <br/> Low Priority to Not Important.<br/>
          <p></p>
        They are then sorted by Date (oldest to newest) <br/> within each category.<br/>
          <p></p>
        Completed tasks will be sent to the top so <br/> do NOT forget to delete them!</p><br/>
        <Link className="back" to='/#/'>Back to home<img src="../home.png" height="30"></img></Link>
      </div>
    )
  }
}

export default About
