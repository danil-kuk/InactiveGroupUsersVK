import React, { Component } from 'react'
import * as vk from '../vk'
import List from './List'

function timer(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default class App extends Component {
  state = {
    users: [],
    groupId: 0,
    progressMax: 1,
    offset: 0,
    isSearching: false
  };

  componentDidMount() {
    this.setState({
      groupId: vk.initGroupId
    })
  }

  startSearch = async() => {
    while (this.state.offset < this.state.progressMax) {
      const users = await vk.getUsersInGroup(this.state.groupId, this.state.offset)
      const deactivatedUsers = users.items.filter((user) => user.deactivated)
      this.setState({
        offset: this.state.offset + vk.USERS_PER_CALL,
        users: this.state.users.concat(deactivatedUsers),
        progressMax: users.count,
        isSearching: true
      })
      await timer(vk.CALL_INTERVAL)
      if (!this.state.isSearching) {
        break
      }
    }
    this.setState({
      isSearching: false
    })
  };

  pauseSearch = () => {
    this.setState({
      isSearching: false
    })
  };

  deleteUser = (userId) => {
    console.log('Delete', userId)
    this.setState({
      users: this.state.users.filter((user) => user.id !== userId)
    })
  };

  render() {
    if (this.state.groupId) {
      return (
        <div className="app">
          {this.state.isSearching ? (
            <button className="app__start-button" onClick={this.pauseSearch}>
              Приостановить поиск
            </button>
          ) : (
            <button className="app__start-button" onClick={this.startSearch}>
              Начать поиск
            </button>
          )}
          <h2>Список пользователей:</h2>
          <progress className="app__progress" value={this.state.offset} max={this.state.progressMax}></progress>
          <List users={this.state.users} onUserDelete={this.deleteUser} />
        </div>
      )
    }
    return (
      <div className="app">
        <h2>Ошибка!</h2>
        <p>Запустите приложение в группе ВКонтакте</p>
      </div>
    )
  }
}
