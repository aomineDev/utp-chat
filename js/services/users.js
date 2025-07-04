import service from './service.js'

class UsersService {
  constructor () {
    this.service = 'users'
  }

  async getUsers () {
    const response = await service.getAll({ service: this.service })
    const users = await response.json()

    return users
  }

  async login ({ user }) {
    const response = await service.post({ service: this.service + '/login', data: user })

    const ok = await response.ok
    const data = await response.json()

    return { ok, user: data.user }
  }
}

export default UsersService
