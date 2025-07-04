import store from '../../store.js'

export function selectUser (user) {
  const id = user["_id"]
  console.log(id)
  console.log(store.users)
  store.user = store.users.find(user => user._id === id)
  console.log(store.user)
}

export function selectChat (chatButton) {
  const chatButtonActive = document.querySelector('.btn-chat.active')
  chatButtonActive.classList.remove('active')
  chatButton.classList.add('active')

  const id = chatButton.dataset.id

  store.chat = store.chats.find(chat => chat._id === id)

  store.userSelected = store.chat.users.find(user => user._id !== store.user._id)
}