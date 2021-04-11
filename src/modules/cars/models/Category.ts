import { v4 as uuid } from 'uuid'

class Category {
  id?: string
  name: string
  description: string
  create_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Category }
