import {
  handleNewUser,
  handleChats,
  handleMessages,
  handleRenders,
  handleNewChat
} from './index.js'

import { renderMessages } from '../renders.js'

export function handleUserButtons () {
  const userButtons = document.querySelectorAll('.btn-user')

  userButtons.forEach(userButton => {
    userButton.addEventListener('click', async ()=> {
      handleNewUser(userButton)

      await handleChats()

      await handleMessages()

      handleRenders()

      handleChatButtons()
    })
  })
}

export function handleChatButtons () {
  const chatButtons = document.querySelectorAll('.btn-chat')

  chatButtons.forEach(chatButton => {
    chatButton.addEventListener('click', async () => {

      handleNewChat(chatButton)

      await handleMessages()

      renderMessages()
    })
  })
}

