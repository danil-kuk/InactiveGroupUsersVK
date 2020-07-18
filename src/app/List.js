import React, { Component } from 'react'

export default class List extends Component {
  render() {
    return (
      <ul className="app__list">
        {this.props.users.map((user) => (
          <li key={user.id}>
            <a href={`https://vk.com/id${user.id}`} target='_blank'>{user.first_name} {user.last_name}</a>
            <button onClick={() => this.props.onUserDelete(user.id)}>✖</button>
          </li>
        ))}
      </ul>
    )
  }
}
