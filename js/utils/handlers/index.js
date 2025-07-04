import store from '../../store.js'

import UsersService from '../../services/users.js'
import ChatsService from '../../services/chats.js'
import MessagesService from '../../services/messages.js'

import {
  overlay,
  imageModal,
  usersBox,
  chatBox,
  messagesBox,
  message,
  btnSubmit,
  fileInput,
  sidenav
} from '../htmlElements.js'

import {
  renderUsers,
  renderUsername,
  renderChats,
  renderUserSelected,
  renderMessages
} from '../renders.js'

import {
  selectUser,
  selectChat
} from './handleSelectors.js'

import { handleChatButtons } from './handleEvents.js'

const usersService = new UsersService()
const chatsService = new ChatsService()
const messagesService = new MessagesService()

export async function handleSubmitLogin(evt) {
  evt.preventDefault()

  const username = this.username.value
  const password = this.password.value

  const login = { 
    username,
    password
  }

  const { ok, user } = await usersService.login({ user: login })

  if (!ok) {
    this.username.classList.add('error')
    this.password.classList.add('error')

    return
  }

  this.username.value = ''
  this.password.value = ''

  handleNewUser(user)
  
  await handleChats()

  await handleMessages()

  handleRenders()

  handleChatButtons()
}

export function handleLoginInput (evt) {
  this.classList.remove('error')
}

export async function handleUsers () {
  const { data: users } = await usersService.getUsers()

  store.users = users

  // renderUsers()
}

export async function handleChats () {
  const { data: chats } = await chatsService.getChats({ userId: store.user._id })

  store.chats = chats

  store.chat = chats[0]

  store.userSelected = store.chat.users.find(user => user._id !== store.user._id)
}

export async function handleMessages () {
  const { data: messages } = await messagesService.getMessagesFilterByChat({ chatId: store.chat._id })

  store.messages = messages
}

export async function handleCreateMessage () {
  if (message.value === '') return

  const data = {
    chat: store.chat._id,
    user: store.user._id,
    message: message.value
  }
  message.value = ''
  btnSubmit.classList.remove('active')

  const createdMessage = await messagesService.createMessage({ message: data })

  if (createdMessage.kind) {
    console.error('[error] name: ' + createdMessage.name)
    console.error('[error] type: ' + createdMessage.kind)
    console.error('[error] message: ' + createdMessage.message)
  }
}

export function handleCreateMessageWithImage () {
  if (message.value === '') return

  const formData = new FormData()

  formData.append('chat', store.chat._id)
  formData.append('user', store.user._id)
  formData.append('message', message.value)
  formData.append('file', fileInput.files[0])

  message.value = ''
  btnSubmit.classList.remove('active')
  fileInput.value = ''
  fileInput.classList.remove('active')

  messagesService.createdMessageWithFile({ message: formData })
}

export function handleUserModal () {
  overlay.classList.toggle('active')
  usersBox.classList.toggle('active')
}

export function handleImageModal () {
  overlay.classList.toggle('active')
  imageModal.classList.toggle('active')
}

export function handleSidenav () {
  overlay.classList.toggle('active')
  sidenav.classList.toggle('active')
}


export function handleNewUser (user) {
  chatBox.innerHTML = ''
  messagesBox.innerHTML = ''

  handleUserModal()

  selectUser(user)

  renderUsername()
}

export function handleNewChat (chatButton) {
  messagesBox.innerHTML = ''

  selectChat(chatButton)

  renderUserSelected()
}

export function handleNewMessage (data) {
  console.log(data)
  if (data.chat !== store.chat._id) return

  data.user = {
    _id: data.user
  }

  store.messages.push(data)

  messagesBox.innerHTML = ''

  renderMessages()
}

export function handleRenders () {
  renderChats()

  renderUserSelected()

  renderMessages()
}