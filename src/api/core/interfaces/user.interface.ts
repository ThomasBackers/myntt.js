interface User {
  id: string
  username: string
  email: string
  hashedPassword: string
  avatarPath: string | null
}

export default User
