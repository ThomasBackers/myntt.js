interface User {
  id: string
  username: string
  email: string
  hashedPassword: string
  verifiedAt: string | null
}

export default User
