import config from '../config/index.js'

const apiUrl = `${config.baseUrl}/api`

function getAll ({ service }) {
  return fetch(`${apiUrl}/${service}`)
}

function get ({ service, id }) {
  return fetch(`${apiUrl}/${service}/${id}`)
}

function getWithQuery ({ service, key, value }) {
  return fetch(`${apiUrl}/${service}?${key}=${value}`)
}

function post ({ service, data }) {
  return fetch(`${apiUrl}/${service}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}

function multipart ({ service, data }) {
  return fetch(`${apiUrl}/${service}`, {
    method: 'POST',
    body: data
  })
}

const service = {
  getAll,
  get,
  getWithQuery,
  post,
  multipart
}

export default service
