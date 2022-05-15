interface User {
  id: string
  username: string
  email: string
  hashedPassword: string
  avatar: string | null
}

export default User
