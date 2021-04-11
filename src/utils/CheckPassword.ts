import bcript from 'bcryptjs'

function handleComparePassword(password: string, password_hash: string) {
  return bcript.compare(password, password_hash)
}

export { handleComparePassword }
