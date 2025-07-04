import service from './service.js'

class MessagesService {
  constructor () {
    this.service = 'messages'
  }

  async getMessages () {
    const response = await service.getAll({ service: this.service })
    const messages = await response.json()

    return messages
  }

  async getMessagesFilterByChat ({ chatId }) {
    const response = await service.getWithQuery({ service: this.service, key: 'chat', value: chatId })
    const messages = await response.json()

    return messages
  }

  async createMessage ({ message }) {
    const response = await service.post({ service: this.service, data: message })
    const data = await response.json()

    if (data.errors) {
      return data.errors.message
    }

    return data
  }

  async createdMessageWithFile ({ message }) {
    const response = await service.multipart({ service: this.service, data: message })
    const createdMessage = await response.json()
    
    return createdMessage
  }
}

export default MessagesService
