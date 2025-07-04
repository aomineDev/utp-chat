import service from './service.js'

class ChatsService {
  constructor () {
    this.service = 'chats'
  }

  async getChats ({ userId }) {
    const response = await service.get({ service: this.service, id: userId })
    const chats = await response.json()

    return chats
  }
}

export default ChatsService
