import config from './config/index.js'

import {
  form,
  message,
  anotheruser,
  anotheruserTwo,
  fileInput,
  closeUsersModal,
  chatsBtn,
  closeChat,
  btnSubmit,
  closeImageModal,
  login
} from './utils/htmlElements.js'

import { handleUserButtons } from './utils/handlers/handleEvents.js'

import {
  handleUsers,
  handleUserModal,
  handleSidenav,
  handleCreateMessage,
  handleCreateMessageWithImage,
  handleNewMessage,
  handleImageModal,
  handleSubmitLogin, handleLoginInput
} from './utils/handlers/index.js'

const socket = io.connect(config.baseUrl)

// EVENTS
// On window load
window.addEventListener('load', async () => {  
  await handleUsers()
  
    // handleUserButtons()
})

login.addEventListener('submit', handleSubmitLogin)
login.username.addEventListener('input', handleLoginInput)
login.password.addEventListener('input', handleLoginInput)

// on close users modal
closeUsersModal.addEventListener('click', handleUserModal)

// on close image modal
closeImageModal.addEventListener('click', handleImageModal)

// on click in another user button
anotheruser.addEventListener('click', handleUserModal)
anotheruserTwo.addEventListener('click', handleUserModal)

// on chats btn
chatsBtn.addEventListener('click', handleSidenav)

// on close chat
closeChat.addEventListener('click', handleSidenav)

// On submit in form
form.addEventListener('submit', e => {
  e.preventDefault()

  if (fileInput.files.length) {
    handleCreateMessageWithImage()
    return
  }
  
  handleCreateMessage()
})

// On message change
message.addEventListener('input', () => {
  if (message.value) {
    btnSubmit.classList.add('active')
    return
  }

  btnSubmit.classList.remove('active')
})

// On file 
fileInput.addEventListener('change', () => {
  fileInput.classList.add('active')
})

// SOCKETS
socket.on('welcome', data => {
  console.log(data)
})

socket.on('message', data => {
  console.log('[socket] message recived')

  handleNewMessage(data)
})
