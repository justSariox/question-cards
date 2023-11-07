export type User = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type Login = {
  email: string
  password: string
  rememberMe: boolean
}

export type SignUp = {
  email: string
  password: string
}

export type SignUpResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
