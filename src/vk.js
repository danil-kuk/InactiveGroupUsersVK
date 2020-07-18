import fetchJsonp from 'fetch-jsonp'
import bridge from '@vkontakte/vk-bridge'

export const USERS_PER_CALL = 1000
export const CALL_INTERVAL = 3000
const apiVersion = '5.120'
const token = '1c45aa361c45aa361c45aa36481c36bcec11c451c45aa364357795fab0c50dad61cbef9'
const urlParams = new URLSearchParams(window.location.search)
export const initGroupId = parseInt(urlParams.get('vk_group_id'))

// Логирует все события нативного клиента в консоль
bridge.subscribe((e) => console.log(e))

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

async function callAPI(method, options) {
  const querry = new URLSearchParams(options)
  const request = `https://api.vk.com/method/${method}?${querry}`
  const response = await fetchJsonp(request)
  const json = await response.json()
  return json.response
}
