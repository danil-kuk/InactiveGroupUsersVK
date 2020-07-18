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
    isSearching: false,
    accessToken: null
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

  redirectToVKAuth = () => {
    vk.getAppAccessToken()
  };

  setAccessToken = (event) => {
    const token = event.target.value
    this.setState({
      accessToken: token.trim()
    })
  };

  deleteUser = async(userId) => {
    const response = await vk.deleteUserFromGroup(this.state.groupId, userId, this.state.accessToken)
    if (response) {
      this.setState({
        users: this.state.users.filter((user) => user.id !== userId)
      })
    }
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
          <div className="app__token">
            <label>
              <span>
                Введите <a onClick={this.redirectToVKAuth}>ключ</a>:{' '}
              </span>
              <input type="text" onChange={this.setAccessToken}></input>
            </label>
          </div>
          <h2>Список пользователей:</h2>
          <progress className="app__progress" value={this.state.offset} max={this.state.progressMax}></progress>
          <span className="app__count">Количество: {this.state.users.length}</span>
          <List users={this.state.users} onUserDelete={this.deleteUser} showDeleteButton={this.state.accessToken} />
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
