import fetchJsonp from 'fetch-jsonp'
import bridge from '@vkontakte/vk-bridge'

export const USERS_PER_CALL = 1000
export const CALL_INTERVAL = 3000
const apiVersion = '5.120'
const urlParams = new URLSearchParams(window.location.search)
const userId = parseInt(urlParams.get('vk_user_id'))
const appId = parseInt(urlParams.get('vk_app_id'))
export let token = ''

// Логирует все события нативного клиента в консоль
bridge.subscribe(handleBridgeEvent)

function handleBridgeEvent(event) {
  console.log(event)
  const eventType = event.detail.type
  if (eventType == 'VKWebAppAccessTokenReceived') {
    token = event.detail.data.access_token
  }
}

// Отправляет событие нативному клиенту
bridge
  .send('VKWebAppInit', {})
  .then(() => {
    console.log('App started')
  })
  .catch((ex) => {
    console.error(ex)
  })

export async function getUserAdminGroups() {
  const options = {
    v: apiVersion,
    access_token: token,
    user_id: userId,
    extended: 1,
    filter: 'admin'
  }
  const result = await callAPI('groups.get', options)
  return result
}

export async function getUserToken() {
  await bridge.send('VKWebAppGetAuthToken', { app_id: appId, scope: 'groups' })
}

export async function getUsersInGroup(groupId, offset) {
  const options = {
    v: apiVersion,
    access_token: token,
    group_id: groupId,
    fields: 'deactivated',
    count: USERS_PER_CALL,
    offset
  }
  const result = await callAPI('groups.getMembers', options)
  return result
}

export async function deleteUserFromGroup(groupId, userId) {
  const options = {
    v: apiVersion,
    access_token: token,
    group_id: groupId,
    user_id: userId
  }
  const result = await callAPI('groups.removeUser', options)
  if (result) {
    return result
  }
}

async function callAPI(method, options) {
  const querry = new URLSearchParams(options)
  const request = `https://api.vk.com/method/${method}?${querry}`
  const response = await fetchJsonp(request)
  const json = await response.json()
  return json.response
}
