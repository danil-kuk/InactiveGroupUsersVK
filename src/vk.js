import fetchJsonp from 'fetch-jsonp'
import bridge from '@vkontakte/vk-bridge'

export const USERS_PER_CALL = 1000
export const CALL_INTERVAL = 3000
export let accessToken = null
const apiVersion = '5.120'
const token = '1c45aa361c45aa361c45aa36481c36bcec11c451c45aa364357795fab0c50dad61cbef9'
const helperAppId = 7542689
const urlParams = new URLSearchParams(window.location.search)
export const initGroupId = parseInt(urlParams.get('vk_group_id'))

// Логирует все события нативного клиента в консоль
bridge.subscribe(handleBridgeEvent)

function handleBridgeEvent(event) {
  console.log(event)
  const eventType = event.detail.type
  if (eventType == 'VKWebAppGetCommunityTokenResult') {
    accessToken = event.detail.data.access_token
  }
}

// Отправляет событие нативному клиенту
bridge
  .send('VKWebAppInit', {})
  .then(() => {
    if (initGroupId) {
      console.log('Init group id:', initGroupId)
    }
  })
  .catch((ex) => {
    console.error(ex)
  })

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

export async function deleteUserFromGroup(groupId, userId, token) {
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

export async function getAppAccessToken() {
  const options = {
    v: apiVersion,
    client_id: helperAppId,
    redirect_uri: 'https://oauth.vk.com/blank.html',
    scope: 'groups',
    response_type: 'token'
  }
  const querry = new URLSearchParams(options)
  const request = `https://oauth.vk.com/authorize?${querry}`
  window.open(request)
}

async function callAPI(method, options) {
  const querry = new URLSearchParams(options)
  const request = `https://api.vk.com/method/${method}?${querry}`
  const response = await fetchJsonp(request)
  const json = await response.json()
  return json.response
}
