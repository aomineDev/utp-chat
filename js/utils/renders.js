import store from '../store.js'
import { handleImageModal } from './handlers/index.js'

import {
  imageWrapper,
  usersBox,
  username,
  chatBox,
  messagesBox,
  messageTitle
} from './htmlElements.js'

export function renderUser (user) {
  const button = document.createElement('button')
  button.setAttribute('class', 'btn btn-user')
  button.setAttribute('data-id', user._id)

  const name = document.createTextNode(user.name)
  button.appendChild(name)

  usersBox.appendChild(button)
}

export function renderUsername () {
  username.style.display = 'block'
  username.innerHTML = store.user.name
}

export function renderChat ({ users, _id }) {
  const user = users.find(user => user._id !== store.user._id)

  if (user._id === store.userSelected._id) {
    chatBox.innerHTML += `<button class="btn btn-chat active" data-id="${_id}">${user.name}</button>`
    return
  }

  chatBox.innerHTML += `<button class="btn btn-chat" data-id="${_id}">${user.name}</button>`
}

export function renderUserSelected () {
  messageTitle.innerHTML = store.userSelected.name
}

export function renderMessage (message) {
  const itsme = message.user._id === store.user._id ? 'itsme' : ''
 
  messagesBox.innerHTML += `
    <div class="messageBox ${itsme}">
      <span class="message">${message.message}</span>
      ${renderImage(message)}
    </div>
  `

  messagesBox.scrollTop = messagesBox.scrollHeight
}

function renderImage ({ fileUrl }) {
  if (fileUrl) {
    // const newFileUrl = fileUrl.replace('localhost', '192.168.18.21')

    return `<img src="${fileUrl}" class="message-image">`
  }

  return ''
}

function renderImageModal ({ image }) {
  imageWrapper.innerHTML = `<img src="${image.src}" class="image">`
}

export function renderUsers () {
  store.users.forEach(user => {
    renderUser(user)
  })
}

export function renderChats () {
  store.chats.forEach(chat => {
    renderChat(chat)
  })
}

export function renderMessages () {
  store.messages.forEach(message => {
    renderMessage(message)
  })

  const images = document.querySelectorAll('.message-image')

  images.forEach(image => {
    image.addEventListener('load', () => {
      messagesBox.scrollTop = messagesBox.scrollHeight
    })


    image.addEventListener('click', () => {
      renderImageModal({ image })
      handleImageModal()
    })
  })
}