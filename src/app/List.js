import React, { Component } from 'react'
import { copyToClipboard } from './helpers'

export default class List extends Component {
  getUserName = (user) => {
    return `${user.first_name} ${user.last_name}`
  };

  getUserLink = (user) => {
    return `https://vk.com/id${user.id}`
  }

  selectUserName = async(event) => {
    const span = event.target
    copyToClipboard(span, 0, 1)
  }

  render() {
    return (
      <ul className="app__list">
        {this.props.users.map((user) => (
          <li key={user.id}>
            <span onClick={this.selectUserName}>{this.getUserName(user)}</span>
            <a href={this.getUserLink(user)} target="_blank">
              (id{user.id})
            </a>
          </li>
        ))}
      </ul>
    )
  }
}
